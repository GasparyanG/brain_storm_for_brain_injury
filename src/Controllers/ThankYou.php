<?php


namespace App\Controllers;


use App\Database\Connection;
use App\Database\Entities\Concern;
use App\Database\Entities\User;
use App\Services\TemplateEngine\Twig\Twig;
use App\Services\Validation\General\CookieEnum;
use App\Services\Validation\General\FieldsEnum;
use App\Services\Validation\General\SymbolicConstantsEnum;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ThankYou
{
    const CONCERNS_DIR_KEY = "concerns_directory";
    const CONCERNS_DIR = "/public/images/concerns";

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
                    "user" => $user,
                    "solid_concern" => $this->getSolidConcern($user),
                    "other_concerns" => $this->getOtherConcerns($user),
                    "max_concern_number" => SymbolicConstantsEnum::MAX_CONCERN
                ]
            )
        );
    }

    private function getSolidConcern(User $user): ?Concern
    {
        foreach ($user->getUserConcerns() as $uc)
            if ($uc->isStrong()) return $uc->getConcern();
        return null;
    }

    private function getOtherConcerns(User $user): array
    {
        $concernsToReturn = [];
        foreach ($user->getUserConcerns() as $uc) {
            if ($uc->getConcern()->getId() > SymbolicConstantsEnum::MAX_CONCERN) continue;
            if (!$uc->isStrong()) $concernsToReturn[] = $uc->getConcern();
        }

        return $concernsToReturn;
    }

    private function unableToRecognizeUser(): Response
    {
        return Response::create("Unable to recognize you.");
    }
}