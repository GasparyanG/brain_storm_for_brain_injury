<?php

namespace App\Controllers;

use Symfony\Component\HttpFoundation\Response;

class Form
{
    public function get(): Response
    {
        return Response::create("Form");
    }
}