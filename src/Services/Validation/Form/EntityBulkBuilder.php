<?php

namespace App\Services\Validation\Form;

use App\Database\Connection;
use App\Database\Entities\InjuryInformation;
use App\Database\Entities\InjuryReason;
use App\Database\Entities\User;
use App\Services\Validation\General\AbstractValidator;
use App\Services\Validation\General\DefaultAssembler;
use App\Services\Validation\General\DefaultErrorGenerator;
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

        // User
        $user = $this->validateUser();
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        // Injury Reason
        $injuryReason = $this->validateInjuryReason();
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        // Validate Injury Information
        $injuryInformation = $this->validateInjuryInformation($user, $injuryReason);
        $injuryReason = $this->validateInjuryReason();
        if ($this->errorStatus()) {
            $this->prepareError();
            return $this->prepareInvalidResponse();
        }

        
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

        // Persistence
        try {
            $this->em->persist($user);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }

        return $user;
    }

    private function validateInjuryReason(): InjuryReason
    {
        // Don't create new record.
        if ($this->isInjuryReasonInRange())
            return $this->em->getRepository(InjuryReason::class)->find($this->form[FieldsEnum::INJURY_REASON]);

        if (isset($this->form[FieldsEnum::INJURY_REASON])) {
            $injuryReason = $this->em->getRepository(InjuryReason::class)
                ->findOneBy([FieldsEnum::NAME => $this->form[FieldsEnum::INJURY_REASON]]);
            if ($injuryReason) return $injuryReason;
        }


        // Create new record.
        $injuryReason = new InjuryReason();
        if ($this->stringIsNotEmpty($this->form, FieldsEnum::INJURY_REASON))
            $injuryReason->setName($this->form[FieldsEnum::INJURY_REASON]);

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

        // Persistence
        try {
            $this->em->persist($injuryInformation);
            $this->em->flush();
        } catch (\ErrorException | ORMException $e) {
            $this->persistenceError = true;
        }

        return $injuryInformation;
    }

    private function isInjuryReasonInRange(): bool
    {
        return (
            isset($this->form[FieldsEnum::INJURY_REASON]) &&                                    // Is Set
            is_numeric($this->form[FieldsEnum::INJURY_REASON]) &&                               // Is Numeric
        ($this->form[FieldsEnum::INJURY_REASON] >= SymbolicConstantsEnum::MIN_INJURY_REASON)    // In Range
        &&($this->form[FieldsEnum::INJURY_REASON] <= SymbolicConstantsEnum::MAX_NUMBER_OF_PAGES)
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

        return $regularAssembler->getPartsContainer();
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
}