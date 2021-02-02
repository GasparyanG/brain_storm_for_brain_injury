<?php

namespace App\Services\Validation\Form;

use App\Database\Connection;
use App\Database\Entities\Concern;
use App\Database\Entities\InjuryInformation;
use App\Database\Entities\InjuryReason;
use App\Database\Entities\User;
use App\Database\Entities\UserConcern;
use App\Services\Validation\General\AbstractValidator;
use App\Services\Validation\General\DefaultAssembler;
use App\Services\Validation\General\DefaultErrorGenerator;
use App\Services\Validation\General\ErrorEnum;
use App\Services\Validation\General\FieldsEnum;
use App\Services\Validation\General\HTTPCommunicationFieldsEnum;
use App\Services\Validation\General\RegularAssembler;
use App\Services\Validation\General\SymbolicConstantsEnum;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;

class EntityBulkBuilder extends AbstractValidator
{
    private array $assocArrayForm;

    // Passed Association Array's Components
    private array $navigation = [];
    private array $form = [];
    private array $errors = [];

    // Validation result, which need to be returned.
    private array $result;

    /**
     * @var EntityManager $em
     */
    private EntityManager $em;

    public function __construct(array $assocArrayForm)
    {
        $this->assocArrayForm = $assocArrayForm;
        $this->em = Connection::getEntityManager();
    }

    public function validate(): array
    {
        if ($this->isInvalidArgument()) return self::defaultErrorResponse();
        $this->extractFields();

        // Validate The User
        $user = $this->validateUser();
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        // Validate The Injury Reason
        $injuryReason = $this->validateInjuryReason();
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        // Validate The Injury Information
        $injuryInformation = $this->validateInjuryInformation($user, $injuryReason);
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        // Validate Concerns
        $concern = $this->validateConcern();
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        if ($concern) {     // Concern can be a null.
            $this->createAndPersistUserConcern($user, $concern);
        }

        // Validate Users Concerns
        $this->validateUsersConcerns($user, $concern ? true: false);

        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        return $this->successResponse();
    }

    private function validateUser(): User
    {
        // Validation
        $user = new User();
        if ($this->stringIsNotEmpty($this->form, FieldsEnum::NAME))
            $user->setName($this->form[FieldsEnum::NAME]);

        if ($this->stringIsNotEmpty($this->form, FieldsEnum::LOCATION))
            $user->setLocation($this->form[FieldsEnum::LOCATION]);

        if ($this->isValidEmailAddress($this->form))
            $user->setEmailAddress($this->form[FieldsEnum::EMAIL]);

        if ($this->isValidAge($this->form))
            $user->setAge($this->form[FieldsEnum::AGE]);

        if (count($this->customErrors) > 0) return $user;

        // Persistence
        try {
            $this->em->persist($user);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }

        return $user;
    }

    private function validateInjuryReason(): ?InjuryReason
    {
        // Don't create new record.
        if ($this->isInjuryReasonInRange())
            return $this->em->getRepository(InjuryReason::class)->find($this->form[FieldsEnum::INJURY_REASON]);
        else if (!$this->stringIsNotEmpty($this->form, FieldsEnum::INJURY_REASON))
            return null;

        $injuryReason = $this->em->getRepository(InjuryReason::class)
            ->findOneBy([FieldsEnum::NAME => $this->form[FieldsEnum::INJURY_REASON]]);
        if ($injuryReason) return $injuryReason;

        // Create new record.
        $injuryReason = new InjuryReason();
        if ($this->stringIsNotEmpty($this->form, FieldsEnum::INJURY_REASON))
            $injuryReason->setName($this->form[FieldsEnum::INJURY_REASON]);

        if (count($this->customErrors) > 0) return $injuryReason;

        // Persistence
        try {
            $this->em->persist($injuryReason);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }

        return $injuryReason;
    }

    private function validateInjuryInformation(User $user, InjuryReason $injuryReason): InjuryInformation
    {
        $injuryInformation = new InjuryInformation();

        // Date setting.
        $date = time();
        if ($this->isValidDateMDY($this->form, $date))
            $injuryInformation->setInjuryDate($date);

        // Connection with other tables/entities.
        $injuryInformation->setInjuryReason($injuryReason);
        $injuryInformation->setUser($user);

        if (count($this->customErrors) > 0) return $injuryInformation;

        // Persistence
        try {
            $this->em->persist($injuryInformation);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }

        return $injuryInformation;
    }

    private function validateConcern(): ?Concern
    {
        if (!isset($this->form[FieldsEnum::CONCERN_OTHER])) return null;        // Don't exists.
        if (strlen($this->form[FieldsEnum::CONCERN_OTHER]) == 0) return null;   // Is empty.
        if (is_numeric($this->form[FieldsEnum::CONCERN_OTHER])) return null;    // Is numeric.

        $concern = $this->em->getRepository(Concern::class)
            ->findOneBy([FieldsEnum::NAME => $this->form[FieldsEnum::CONCERN_OTHER]]);

        if ($concern) return $concern;                                           // Already exists in database.

        // Create new record.
        $concern = new Concern();
        $concern->setName($this->form[FieldsEnum::CONCERN_OTHER]);

        try {
            $this->em->persist($concern);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }

        return $concern;
    }

    private function validateUsersConcerns(User $user, bool $concernOther): void
    {
        if ($this->concernsNotExist() && !$concernOther) {
            $this->addError(ErrorEnum::isRequiredError(FieldsEnum::CONCERNS), FieldsEnum::CONCERNS);
            return;
        }

        $concerns = $this->form[FieldsEnum::CONCERNS];
        foreach ($concerns as $concernValue) {
            if (is_numeric($concernValue) && $this->concernIsValidNumeric($concernValue)) {
                $concern = $this->em->getRepository(Concern::class)->find($concernValue);
                if ($concern)
                    $this->createAndPersistUserConcern($user, $concern);
                else
                    self::removeConcernFromArray($concerns, $concernValue);
            } else
                self::removeConcernFromArray($concerns, $concernValue);
        }

        if (count($concerns) == 0 && !$concernOther)
            $this->addError(ErrorEnum::isRequiredError(FieldsEnum::CONCERNS), FieldsEnum::CONCERNS);

        // Update concerns.
        $newConcerns = [];
        foreach ($concerns as $c)
            $newConcerns[] = $c;
        $this->form[FieldsEnum::CONCERNS] = $newConcerns;
    }

    private function createAndPersistUserConcern(User $user, Concern $concern): void
    {
        $userConcern = new UserConcern();
        $userConcern->setUser($user);
        $userConcern->setConcern($concern);

        if (isset($this->form[FieldsEnum::SOLID_CONCERN])
            && $this->form[FieldsEnum::SOLID_CONCERN] == $concern->getId())
            $userConcern->setStrong(true);
        else
            $userConcern->setStrong(false);

        try {
            $this->em->persist($userConcern);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }
    }

    private function concernIsValidNumeric(int $concern): bool
    {
        if (!is_numeric($concern)) return false;                                               // Not a numeric value
        if ($concern < SymbolicConstantsEnum::MIN_CONCERN
            || $concern > SymbolicConstantsEnum::MAX_CONCERN) return false;                     // Out of range

        return true;
    }

    private function concernsNotExist(): bool
    {
        if (!isset($this->form[FieldsEnum::CONCERNS])) return true;                             // Isn't Set
        if (!is_array($this->form[FieldsEnum::CONCERNS])) return true;                          // Not an Array
        if (count($this->form[FieldsEnum::CONCERNS]) == 0) return true;                         // Is Empty

        return false;
    }

    private function isInjuryReasonInRange(): bool
    {
        return (
            isset($this->form[FieldsEnum::INJURY_REASON]) &&                                    // Is Set
            is_numeric($this->form[FieldsEnum::INJURY_REASON]) &&                               // Is Numeric
            (($this->form[FieldsEnum::INJURY_REASON] >= SymbolicConstantsEnum::MIN_INJURY_REASON)    // In Range
        && ($this->form[FieldsEnum::INJURY_REASON] <= SymbolicConstantsEnum::MAX_INJURY_REASON))
        );
    }

    private function extractFields(): void
    {
        // Navigation
        $this->navigation =
            isset($this->assocArrayForm[FieldsEnum::NAVIGATION])
            ? $this->assocArrayForm[FieldsEnum::NAVIGATION]
            : DefaultAssembler::navigation();

        // Errors
        $this->errors =
            isset($this->assocArrayForm[FieldsEnum::ERRORS])
            ? $this->assocArrayForm[FieldsEnum::ERRORS]
            : DefaultAssembler::errors();

        // Form
        $this->form = $this->assocArrayForm[FieldsEnum::FORM];
    }

    private function isInvalidArgument(): bool
    {
        if (!is_array($this->assocArrayForm)) return true;
        if (!isset($this->assocArrayForm[FieldsEnum::FORM])) return true;

        return false;
    }

    public static function defaultErrorResponse(): array
    {
        $errorResponse = [];
        $errorResponse[HTTPCommunicationFieldsEnum::SUCCESS] = false;
        $errorResponse[HTTPCommunicationFieldsEnum::DATA] = (new DefaultErrorGenerator())->generate();

        return $errorResponse;
    }

    private function prepareInvalidResponse(): array
    {
        $regularAssembler = new RegularAssembler();

        // Assemble
        $regularAssembler->setErrors($this->customErrors);
        $regularAssembler->setNavigation($this->navigation);
        $regularAssembler->setForm($this->form);

        return [
            HTTPCommunicationFieldsEnum::SUCCESS => false,
            HTTPCommunicationFieldsEnum::DATA => $regularAssembler->getPartsContainer()
        ];
    }

    private function successResponse(): array
    {
        $regularAssembler = new RegularAssembler();

        // Assemble
        $regularAssembler->setErrors($this->customErrors);
        $regularAssembler->setNavigation($this->navigation);
        $regularAssembler->setForm($this->form);

        return [
            HTTPCommunicationFieldsEnum::SUCCESS => true,
            HTTPCommunicationFieldsEnum::DATA => $regularAssembler->getPartsContainer()
        ];
    }

    private function errorStatus(): bool
    {
        if ($this->persistenceError || count($this->customErrors) > 0)
            return true;

        return false;
    }

    private function prepareError(): void
    {
        // Not required to be implemented at this moment.
        // The idea is to merge this->errors with this->customErrors.
    }

    private static function removeConcernFromArray(array &$concerns, $concernValue): void
    {
        $index = array_search($concernValue, $concerns);
        unset($concerns[$index]);
    }
}