<?php


namespace App\Controllers;


use App\Database\Connection;
use App\Database\Entities\User;
use App\Services\TemplateEngine\Twig\Twig;
use App\Services\Validation\General\CookieEnum;
use App\Services\Validation\General\FieldsEnum;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ThankYou
{
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

        return Response::create(
            (new Twig())->render("/pages/thank_you.html.twig",
                [
                    "page_title" => "Thank You"
                ]
            )
        );
    }

    private function unableToRecognizeUser(): Response
    {
        return Response::create("Unable to recognize you.");
    }
}