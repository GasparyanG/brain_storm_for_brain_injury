<?php


namespace App\Services\Validation\Form;


use App\Database\Connection;
use App\Database\Entities\User;
use App\Database\Entities\UserMessage as UserMessageEntity;
use App\Services\Validation\General\AbstractValidator;
use App\Services\Validation\General\CookieEnum;
use App\Services\Validation\General\ErrorEnum;
use App\Services\Validation\General\FieldsEnum;
use App\Services\Validation\General\SymbolicConstantsEnum;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\Request;

class UserMessage extends AbstractValidator
{
    private array $formAssocArray;
    private string $message;
    private EntityManager $em;

    public function __construct(array $formAssocArray)
    {
        $this->formAssocArray = $formAssocArray;
        $this->em = Connection::getEntityManager();
    }

    public function validate(): array
    {
        $user = $this->getUser();

        if ($this->invalidArgument() || !$user) return static::invalidArgumentResponse();
        $this->extractFields();

        if (!$this->stringIsNotEmpty($this->formAssocArray, FieldsEnum::MESSAGE)
            || !$this->stringNotExceeds($this->message, FieldsEnum::MESSAGE, SymbolicConstantsEnum::MAX_NUMBER_OF_CHARACTERS))
            return static::defaultErrorMessage($this->customErrors[FieldsEnum::MESSAGE][FieldsEnum::MESSAGE]);

        $userMessage = $this->em->getRepository(UserMessageEntity::class)->findOneBy(
            [
                "user" => $user
            ]
        );

        if (!$userMessage) {
            $userMessage = new UserMessageEntity();
            $userMessage->setUser($user);
        }

        $userMessage->setMessage($this->message);

        try {
            $this->em->persist($userMessage);
            $this->em->flush();
        } catch (ORMException $e) {
            $this->persistenceError = true;
        }

        if ($this->persistenceError)
            return static::invalidArgumentResponse();

        return static::successResponse();
    }

    private function invalidArgument(): bool
    {
        if (!isset($this->formAssocArray[FieldsEnum::MESSAGE])) return true;
        return false;
    }

    public static function invalidArgumentResponse(): array
    {
        return [
            FieldsEnum::SUCCESS => false,
            FieldsEnum::MESSAGE => ErrorEnum::SOMETHING_WENT_WRONG
        ];
    }

    public static function defaultErrorMessage(string $message): array
    {
        return [
            FieldsEnum::SUCCESS => false,
            FieldsEnum::MESSAGE => $message
        ];
    }

    public static function successResponse(): array
    {
        return [
            FieldsEnum::SUCCESS => true,
            FieldsEnum::MESSAGE => ErrorEnum::MESSAGE_SEND
        ];
    }

    private function extractFields(): void
    {
        $this->message = $this->formAssocArray[FieldsEnum::MESSAGE];
    }

    private function getUser(): ?User
    {
        $request = Request::createFromGlobals();
        $userCookie = $request->cookies->get(CookieEnum::USER_COOKIE_KEY);

        if (!$userCookie) return null;

        $user = $this->em->getRepository(User::class)->findOneBy(
            [
                "cookie" => $userCookie
            ]
        );

        if ($user) return $user;
        else return null;
    }
}