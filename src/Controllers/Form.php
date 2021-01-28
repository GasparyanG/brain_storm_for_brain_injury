<?php

namespace App\Controllers;

use App\Services\TemplateEngine\Twig\Twig;
use Symfony\Component\HttpFoundation\Response;

class Form
{
    public function get(): Response
    {
        return Response::create(
            (new Twig())->render("/pages/form.html.twig")
        );
    }
}