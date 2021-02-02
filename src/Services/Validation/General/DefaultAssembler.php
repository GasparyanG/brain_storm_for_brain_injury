<?php


namespace App\Services\Validation\General;


class DefaultAssembler
{
    public static function navigation(): array
    {
        $navigationArray = [];

        $navigationArray[FieldsEnum::CURRENT_POSITION] = SymbolicConstantsEnum::MAX_NUMBER_OF_PAGES;
        $navigationArray[FieldsEnum::MAX_NUMBER_OF_PAGES] = SymbolicConstantsEnum::MAX_NUMBER_OF_PAGES;

        return $navigationArray;
    }

    public static function form(): array
    {
        $form = [];

        $form[FieldsEnum::NAME] = "";
        $form[FieldsEnum::AGE] = "";
        $form[FieldsEnum::EMAIL] = "";
        $form[FieldsEnum::LOCATION] = "";
        $form[FieldsEnum::CONCERNS] = [];
        $form[FieldsEnum::SOLID_CONCERN] = "";
        $form[FieldsEnum::CONCERN_OTHER] = "";
        $form[FieldsEnum::INJURY_DATE_DAY] = "";
        $form[FieldsEnum::INJURY_DATE_MONTH] = "";
        $form[FieldsEnum::INJURY_DATE_YEAR] = "";
        $form[FieldsEnum::INJURY_REASON] = "";

        return $form;
    }

    public static function errors(): array
    {
        $errors = [];

        $errors[FieldsEnum::NAME] = [
            FieldsEnum::MESSAGE => ErrorEnum::NAME
        ];
        $errors[FieldsEnum::AGE] = [
            FieldsEnum::MESSAGE => ErrorEnum::AGE_REQUIRED
        ];
        $errors[FieldsEnum::EMAIL] = [
            FieldsEnum::MESSAGE => ErrorEnum::EMAIL_REQUIRED
        ];
        $errors[FieldsEnum::LOCATION] = [
            FieldsEnum::MESSAGE => ErrorEnum::LOCATION_REQUIRED
        ];
        $errors[FieldsEnum::CONCERNS] = [
            FieldsEnum::MESSAGE => ErrorEnum::CONCERNS_REQUIRED
        ];
        $errors[FieldsEnum::DATE] = [
            FieldsEnum::MESSAGE => ErrorEnum::DATE_REQUIRED
        ];
        $errors[FieldsEnum::INJURY_REASON] = [
            FieldsEnum::MESSAGE => ErrorEnum::INJURY_REASON_REQUIRED
        ];

        return $errors;
    }
}