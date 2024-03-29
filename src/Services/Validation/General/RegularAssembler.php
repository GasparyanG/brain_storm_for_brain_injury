<?php


namespace App\Services\Validation\General;


class RegularAssembler
{
    private array $navigation;
    private array $errors;
    private array $form;

    private array $partsContainer;

    public function setForm(array $form): void
    {
        $this->partsContainer[FieldsEnum::FORM] = $form;
    }

    public function setErrors(array $errors): void
    {
        $this->partsContainer[FieldsEnum::ERRORS] = $errors;
    }

    public function setNavigation(array $navigation): void
    {
        $this->partsContainer[FieldsEnum::NAVIGATION] = $navigation;
    }

    public function getPartsContainer(): array
    {
        $this->sanitizeForm();
        $this->sanitizeErrors();
        $this->sanitizeNavigation();

        return $this->partsContainer;
    }

    private function sanitizeForm(): void
    {
        if (isset($this->partsContainer[FieldsEnum::FORM])) return;
        $this->partsContainer[FieldsEnum::FORM] = DefaultAssembler::form();
    }

    private function sanitizeErrors(): void
    {
        if (isset($this->partsContainer[FieldsEnum::ERRORS])) return;
        $this->partsContainer[FieldsEnum::ERRORS] = DefaultAssembler::errors();
    }

    private function sanitizeNavigation(): void
    {
        if (!isset($this->partsContainer[FieldsEnum::ERRORS]))
            if (isset($this->partsContainer[FieldsEnum::NAVIGATION])) return;
            else {
                $this->partsContainer[FieldsEnum::NAVIGATION] = DefaultAssembler::navigation();
                return;
            }


        if(count($this->partsContainer[FieldsEnum::ERRORS]) > 0) {
            $key = key($this->partsContainer[FieldsEnum::ERRORS]);

            $pageNumber = SymbolicConstantsEnum::getPageNumber($key);
            $this->partsContainer[FieldsEnum::NAVIGATION][FieldsEnum::CURRENT_POSITION] = $pageNumber;
            $this->partsContainer[FieldsEnum::NAVIGATION][FieldsEnum::MAX_NUMBER_OF_PAGES]
                = SymbolicConstantsEnum::MAX_NUMBER_OF_PAGES;
        } else {
            $this->partsContainer[FieldsEnum::NAVIGATION] = DefaultAssembler::navigation();
        }
    }
}