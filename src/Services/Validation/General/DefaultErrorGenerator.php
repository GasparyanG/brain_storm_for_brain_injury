<?php


namespace App\Services\Validation\General;

use App\Services\Validation\General\ErrorEnum;

class DefaultErrorGenerator
{
    private array $assocArrayForm = [];

    public function generate(): array
    {
        $this->prepareForm();
        $this->prepareNavigation();
        $this->prepareErrors();

        return $this->assocArrayForm;
    }

    private function prepareForm(): void
    {

    }

    private function prepareNavigation(): void
    {

    }

    private function prepareErrors(): void
    {

    }
}