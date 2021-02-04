<?php

namespace App\Controllers;

use App\Services\TemplateEngine\Twig\Twig;
use App\Services\Validation\Form\EntityBulkBuilder;
use App\Services\Validation\General\HTTPCommunicationFieldsEnum;
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
        $parsedArray = json_decode($req->getContent(), true);
        if (!is_array($parsedArray))
            return self::failResponse(EntityBulkBuilder::defaultErrorResponse());

        $resultOfValidation = (new EntityBulkBuilder($parsedArray))->validate();
        if (!$resultOfValidation[HTTPCommunicationFieldsEnum::SUCCESS])
            return self::failResponse($resultOfValidation);

        return self::successResponse($resultOfValidation);
    }

    private static function failResponse(array $resultOfValidation): Response
    {
        // TODO: change to HTTP_NOT_FOUND
        return Response::create(json_encode($resultOfValidation), Response::HTTP_OK);
    }

    private static function successResponse(array $resultOfValidation): Response
    {
        return Response::create(json_encode(($resultOfValidation)), Response::HTTP_OK);
    }

}