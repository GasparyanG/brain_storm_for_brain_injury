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

abstract class AbstractSymptom
{
    protected EntityManager $em;

    public function __construct()
    {
        $this->em = Connection::getEntityManager();
    }

    protected function userExists(Request $request): bool
    {
        $cookies = $request->cookies;
        if (!$cookies->get(CookieEnum::USER_COOKIE_KEY)) return false;

        $user = $this->em->getRepository(User::class)->findOneBy(
            [
                FieldsEnum::COOKIE => $cookies->get(CookieEnum::USER_COOKIE_KEY)
            ]
        );

        if (!$user) return false;

        return true;
    }

    protected function getValidSymptoms(): array
    {
        $symptoms = $this->em->getRepository(Concern::class)->findBy(
            [
                FieldsEnum::DESCRIBED => true
            ]
        );

        if (!is_array($symptoms) || count($symptoms) === 0) return [];
        return $symptoms;
    }

    protected function unableToRecognizeUser(): Response
    {
        return Response::create(
            (new Twig())->render("/pages/not_found.html.twig",
                [
                    "page_title" => "Access  Denied",
                    "no_user" => true
                ]
            )
        );
    }
}