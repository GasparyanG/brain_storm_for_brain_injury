<?php


namespace App\Controllers;


use Symfony\Component\HttpFoundation\Response;

class Contact
{
    public function plainMessage(): Response
    {
        return Response::create("Message Delivered");
    }
}