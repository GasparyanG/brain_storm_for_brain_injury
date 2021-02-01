<?php


namespace App\Services\Validation\General;

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

    public function prepareForm(): void
    {
        $this->assocArrayForm[FieldsEnum::FORM] = DefaultAssembler::form();
    }

    public function prepareNavigation(): void
    {
        $this->assocArrayForm[FieldsEnum::NAVIGATION] = DefaultAssembler::navigation();
    }

    public function prepareErrors(): void
    {
        $this->assocArrayForm[FieldsEnum::ERRORS] = DefaultAssembler::errors();
    }
}