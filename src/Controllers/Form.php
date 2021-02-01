<?php

namespace App\Controllers;

use App\Services\TemplateEngine\Twig\Twig;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Form
{
    public function get(): Response
    {
        return Response::create(
            (new Twig())->render("/pages/form.html.twig")
        );
    }

    public function submit(Request $req): Response
    {
        // -[] Accept data
        // -[] Create Entity
        // -[] Validate
        //      -[] Email validation (hint: send verification code to email address).
        // -[] Persist



        return Response::create(
            $req->getContent()
        );
    }
}