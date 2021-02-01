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

    private function prepareForm(): void
    {
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::NAME] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::AGE] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::EMAIL] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::LOCATION] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::CONCERNS] = [];
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::SOLID_CONCERN] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::CONCERN_OTHER] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::INJURY_DATE_DAY] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::INJURY_DATE_MONTH] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::INJURY_DATE_YEAR] = "";
        $this->assocArrayForm[FieldsEnum::FORM][FieldsEnum::INJURY_REASON] = "";
    }

    private function prepareNavigation(): void
    {
        $this->assocArrayForm[FieldsEnum::NAVIGATION][FieldsEnum::CURRENT_POSITION] = SymbolicConstantsEnum::PAGE_INITIAL_POSITION;
        $this->assocArrayForm[FieldsEnum::NAVIGATION][FieldsEnum::MAX_NUMBER_OF_PAGES] = SymbolicConstantsEnum::MAX_NUMBER_OF_PAGES;
    }

    private function prepareErrors(): void
    {
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::NAME] = [
            FieldsEnum::MESSAGE => ErrorEnum::NAME
        ];
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::AGE] = [
            FieldsEnum::MESSAGE => ErrorEnum::AGE_REQUIRED
        ];
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::EMAIL] = [
            FieldsEnum::MESSAGE => ErrorEnum::EMAIL_REQUIRED
        ];
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::LOCATION] = [
            FieldsEnum::MESSAGE => ErrorEnum::LOCATION_REQUIRED
        ];
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::SOLID_CONCERN] = [
            FieldsEnum::MESSAGE => ErrorEnum::CONCERNS_REQUIRED
        ];
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::DATE] = [
            FieldsEnum::MESSAGE => ErrorEnum::DATE_REQUIRED
        ];
        $this->assocArrayForm[FieldsEnum::ERRORS][FieldsEnum::INJURY_REASON] = [
            FieldsEnum::MESSAGE => ErrorEnum::INJURY_REASON_REQUIRED
        ];
    }
}