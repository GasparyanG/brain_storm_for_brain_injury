<?php


namespace App\Controllers;


use App\Services\TemplateEngine\Twig\Twig;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Symptom
{
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
}