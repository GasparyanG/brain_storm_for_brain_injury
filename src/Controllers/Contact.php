<?php


namespace App\Controllers;


use App\Services\Validation\Form\UserMessage;
use App\Services\Validation\General\CookieEnum;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contact
{
    public function plainMessage(Request $request): Response
    {
        $cookie = $request->cookies->get(CookieEnum::USER_COOKIE_KEY);
        $data = json_decode($request->getContent(), true);

        try {

            if (!$cookie || count($data) == 0) return $this->errorResponse(UserMessage::invalidArgumentResponse());
        } catch (\Exception $e) {
            return $this->errorResponse(UserMessage::invalidArgumentResponse());
        }


        $message = (new UserMessage($data))->validate();
        return Response::create(json_encode($message));
    }

    private function successMessage(array $message): Response
    {
        return Response::create(json_encode($message));
    }

    private function errorResponse(array $message): Response
    {
        return Response::create(json_encode($message));
    }
}