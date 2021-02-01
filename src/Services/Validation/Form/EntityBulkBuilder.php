<?php

namespace App\Services\Validation\Form;

use App\Services\Validation\General\AbstractValidator;
use App\Services\Validation\General\DefaultAssembler;
use App\Services\Validation\General\DefaultErrorGenerator;
use App\Services\Validation\General\FieldsEnum;
use App\Services\Validation\General\HTTPCommunicationFieldsEnum;

class EntityBulkBuilder extends AbstractValidator
{
    private array $assocArrayForm;

    // Passed Association Array's Components
    private array $navigation = [];
    private array $form = [];
    private array $errors = [];

    // Validation result, which need to be returned.
    private array $result;

    public function __construct(array $assocArrayForm)
    {
        $this->assocArrayForm = $assocArrayForm;
    }

    public function validate(): array
    {
        if ($this->isInvalidArgument()) return self::defaultErrorResponse();
        $this->extractFields();

        return self::defaultErrorResponse();    // TODO: validate properly
    }

    private function extractFields(): void
    {
        // Navigation
        $this->navigation =
            isset($this->assocArrayForm[FieldsEnum::NAVIGATION])
            ? $this->assocArrayForm[FieldsEnum::NAVIGATION]
            : DefaultAssembler::navigation();

        // Errors
        $this->errors =
            isset($this->assocArrayForm[FieldsEnum::ERRORS])
            ? $this->assocArrayForm[FieldsEnum::ERRORS]
            : DefaultAssembler::errors();

        // Form
        $this->form = $this->assocArrayForm[FieldsEnum::FORM];
    }

    private function isInvalidArgument(): bool
    {
        if (!is_array($this->assocArrayForm)) return true;
        if (!isset($this->assocArrayForm[FieldsEnum::FORM])) return true;

        return false;
    }

    public static function defaultErrorResponse(): array
    {
        $errorResponse = [];
        $errorResponse[HTTPCommunicationFieldsEnum::SUCCESS] = false;
        $errorResponse[HTTPCommunicationFieldsEnum::DATA] = (new DefaultErrorGenerator())->generate();

        return $errorResponse;
    }
}