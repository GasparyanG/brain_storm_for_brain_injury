<?php


namespace App\Controllers;


use App\Database\Connection;
use App\Database\Entities\Concern;
use App\Services\TemplateEngine\Twig\Twig;
use App\Services\Validation\General\FieldsEnum;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Symptom
{
    private EntityManager $em;

    public function __construct()
    {
        $this->em = Connection::getEntityManager();
    }

    public function getHeadaches(Request $req): Response
    {
        return Response::create(
            (new Twig())->render("pages/headaches.html.twig",
                [
                    "page_title" => "Headaches"
                ]
            )
        );
    }

    public function getCollection(Request $req): Response
    {
        $symptoms = $this->getValidSymptoms();

        return Response::create(
            (new Twig())->render("pages/symptom_collection.html.twig",
                [
                    "page_title" => "Symptoms",
                    "symptoms" => $symptoms,
                    ThankYou::CONCERNS_DIR_KEY => ThankYou::CONCERNS_DIR,
                ]
            )
        );
    }

    private function getValidSymptoms(): array
    {
        $symptoms = $this->em->getRepository(Concern::class)->findBy(
            [
                FieldsEnum::DESCRIBED => true
            ]
        );

        if (!is_array($symptoms) || count($symptoms) === 0) return [];
        return $symptoms;
    }
}