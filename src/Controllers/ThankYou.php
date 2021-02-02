<?php


namespace App\Controllers;


use App\Services\TemplateEngine\Twig\Twig;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ThankYou
{
    public function get(Request $req): Response
    {
        return Response::create(
            (new Twig())->render("/pages/thank_you.html.twig",
                [
                    "page_title" => "Thank You"
                ]
            )
        );
    }
}