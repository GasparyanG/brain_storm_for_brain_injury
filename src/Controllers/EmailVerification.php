<?php


namespace App\Controllers;


use App\Database\Connection;
use App\Database\Entities\User;
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
}