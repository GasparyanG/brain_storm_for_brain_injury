<?php


namespace App\Services\Validation\Form;


use App\Database\Connection;
use App\Database\Entities\User;
use App\Services\Mailer\EmailVerification;
use App\Services\Validation\General\AbstractValidator;
use App\Services\Validation\General\CookieEnum;
use App\Services\Validation\General\ErrorEnum;
use App\Services\Validation\General\FieldsEnum;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\Request;

class UserEmail extends AbstractValidator
{
    private array $data;
    private EntityManager $em;
    private Request $request;

    public function __construct(array $data)
    {
        $this->data = $data;
        $this->em = Connection::getEntityManager();
        $this->request = Request::createFromGlobals();
    }

    public function validate(): array
    {
        if (!$this->isValidEmail()) return self::invalidArgumentResponse();

        // Update the user's email address and send verification message/email.
        $cookie = $this->request->cookies->get(CookieEnum::USER_COOKIE_KEY);
        if (!$cookie) return self::errorResponse(ErrorEnum::UNABLE_TO_IDENTIFY);

        $user = $this->em->getRepository(User::class)->findOneBy(
            [
                FieldsEnum::COOKIE => $cookie
            ]
        );

        if (!$user) return self::errorResponse(ErrorEnum::UNABLE_TO_IDENTIFY);

        $user->setEmailAddress($this->data[FieldsEnum::EMAIL]);

        try {
            $this->em->persist($user);
            $this->em->flush();
        } catch (ORMException $e) {
            return self::errorResponse(ErrorEnum::SOMETHING_WENT_WRONG);
        }

        // Verification Message
        $verified = (new EmailVerification($user))->verify();
        if (!$verified)
            return self::errorResponse(ErrorEnum::WRONG_EMAIL);

        return self::successResponse();
    }

    public static function invalidArgumentResponse(): array
    {
        return [
            FieldsEnum::SUCCESS => false,
            FieldsEnum::MESSAGE => ErrorEnum::EMAIL_WRONG_FORMAT
        ];
    }

    public static function errorResponse(string $message): array
    {
        return [
            FieldsEnum::SUCCESS => false,
            FieldsEnum::MESSAGE => $message
        ];
    }

    private static function successResponse(): array
    {
        return [FieldsEnum::SUCCESS => true];
    }

    private function isValidEmail(): bool
    {
        if (!isset($this->data[FieldsEnum::EMAIL])
            || $this->data[FieldsEnum::EMAIL] === "") return false;

        if (!filter_var($this->data[FieldsEnum::EMAIL], FILTER_VALIDATE_EMAIL)) return false;

        return true;
    }
}