<?php


namespace App\Controllers;


use App\Services\TemplateEngine\Twig\Twig;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Symptom extends AbstractSymptom
{
    public function getHeadaches(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

        return Response::create(
            (new Twig())->render("pages/headaches.html.twig",
                [
                    "page_title" => "Headaches"
                ]
            )
        );
    }

    public function getFatigue(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

        return Response::create(
            (new Twig())->render("pages/fatigue.html.twig",
                [
                    "page_title" => "Fatigue"
                ]
            )
        );
    }

    public function getSpeakingDifficulties(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

        return Response::create(
            (new Twig())->render("pages/speaking_difficulties.html.twig",
                [
                    "page_title" => "Speaking Difficulties"
                ]
            )
        );
    }

    public function getEmotionalDifficulties(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

        return Response::create(
            (new Twig())->render("pages/emotional_difficulties.html.twig",
                [
                    "page_title" => "Emotional Difficulties"
                ]
            )
        );
    }

    public function getThinkingDifficulties(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

        return Response::create(
            (new Twig())->render("pages/thinking_difficulties.html.twig",
                [
                    "page_title" => "Thinking Difficulties"
                ]
            )
        );
    }

    public function getHandOrArmDifficulties(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

        return Response::create(
            (new Twig())->render("pages/hand_or_arm_difficulties.html.twig",
                [
                    "page_title" => "Difficulty Using Hands and Arms"
                ]
            )
        );
    }

    public function getCollection(Request $req): Response
    {
        if (!$this->userExists($req)) return $this->unableToRecognizeUser();

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
}