<?php


namespace App\Controllers;


use App\Database\Connection;
use App\Database\Entities\User;
use App\Services\Validation\Form\UserEmail;
use App\Services\Validation\General\CookieEnum;
use App\Services\Validation\General\ErrorEnum;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EmailVerification
{
    // Entity field
    const VALIDATION_HASH_ENT = "validationHash";
    // Table Field
    const VALIDATION_HASH = "validation_hash";

    private EntityManager $em;

    public function __construct()
    {
        $this->em = Connection::getEntityManager();
    }

    public function verify(Request $req, array $urlArgs): Response
    {
        $user = $this->em->getRepository(User::class)->findOneBy(
            [
                self::VALIDATION_HASH_ENT => $urlArgs[self::VALIDATION_HASH]
            ]
        );

        if (!$user) return Response::create("Verification failed.");

        $user->setValidated(true);

        try {
            $this->em->persist($user);
            $this->em->flush();
        } catch (ORMException $e) {
            return Response::create("Verification failed.");
        }

        return Response::create("Verified.");
    }

    public function verifyPost(Request $req): Response
    {
        $cookie = $req->cookies->get(CookieEnum::USER_COOKIE_KEY);
        $data = json_decode($req->getContent(), true);

        try {
            if (!$cookie || !is_array($data) || count($data) == 0)
                return $this->errorResponse(UserEmail::errorResponse(ErrorEnum::WRONG_INFORMATION));
        } catch (\Exception $e) {
            return $this->errorResponse(UserEmail::errorResponse(ErrorEnum::WRONG_INFORMATION));
        }

        $message = (new UserEmail($data))->validate();
        return Response::create(json_encode($message));
    }

    public function errorResponse(array $data): Response
    {
        return Response::create(json_encode($data));
    }
}