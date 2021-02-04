<?php


namespace App\Controllers;


use App\Database\Connection;
use App\Database\Entities\Concern;
use App\Database\Entities\User;
use App\Services\TemplateEngine\Twig\Twig;
use App\Services\Validation\General\CookieEnum;
use App\Services\Validation\General\FieldsEnum;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ThankYou
{
    const CONCERNS_DIR_KEY = "concerns_directory";
    const CONCERNS_DIR = __DIR__ . "/../../public/images/concerns";

    private EntityManager $em;

    public function __construct()
    {
        $this->em = Connection::getEntityManager();
    }

    public function get(Request $req): Response
    {
        $cookies = $req->cookies;
        if (!$cookies->get(CookieEnum::USER_COOKIE_KEY))
            return $this->unableToRecognizeUser();
        else {
            $user = $this->em->getRepository(User::class)->findOneBy(
                [
                    FieldsEnum::COOKIE => $cookies->get(CookieEnum::USER_COOKIE_KEY)
                ]
            );

            if (!$user) return $this->unableToRecognizeUser();
        }

        $user = $this->em->getRepository(User::class)->findOneBy(
            [
                FieldsEnum::COOKIE => $cookies->get(CookieEnum::USER_COOKIE_KEY)
            ]
        );

        return Response::create(
            (new Twig())->render("/pages/thank_you.html.twig",
                [
                    "page_title" => "Thank You",
                    self::CONCERNS_DIR_KEY => self::CONCERNS_DIR,
                    "user" => $user
                ]
            )
        );
    }

    private function getSolidConcern(): ?Concern
    {
        
    }

    private function unableToRecognizeUser(): Response
    {
        return Response::create("Unable to recognize you.");
    }
}