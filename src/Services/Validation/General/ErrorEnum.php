<?php

// ALWAYS MAKE SURE THIS ERRORS ARE SYNCHRONIZED WITH src/helper_components.js ERRORS

namespace App\Services\Validation\General;

class ErrorEnum
{
    // GENERAL
    const NUMBERS_ONLY = "Numbers only";
    const SOMETHING_WENT_WRONG = "Something went wrong";
    const MESSAGE_TOO_LONG = "Message is too long";
    const MESSAGE_IS_REQUIRED = "Message is required";

    // NAME
    const NAME = "Name is required";

    // AGE
    const AGE_REQUIRED = "Age is required";
    const AGE_OUT_OF_RANGE = "Your age seems too unrealistic";

    // LOCATION
    const LOCATION_REQUIRED = "Location is required";

    // Email
    const EMAIL_REQUIRED = "Email is required";
    const EMAIL_WRONG_FORMAT = "Wrong email format";

    // DATE AND TIME
    const DATE_WRONG = "Date is wrong";

    const FILL_DATE_ENTIRELY = "Fill date entirely";
    const DAY_WRONG = "Day is wrong";
    const MONTH_WRONG = "Month is wrong";
    const YEAR_WRONG = "Year is wrong";
    const DATE_REQUIRED = "Date is required";

    // INJURY REASON
    const INJURY_REASON_REQUIRED = "Injury reason is required";

    // CONCERNS
    const CONCERNS_REQUIRED = "At least one concern is required";

    // START
    // URGENT!!! Make sure that this is synchronized with 'helper_components.js'.
    // The reason is that this is string is being compared in 'form_container.js'.
    const MORE_THAN_THREE = "Can't choose more than three concerns";
    // END

    const CANT_TYPE = "Can't type: you already made three choices";
    const SOLID_CONCERN_REQUIRED = "Solid concern is required";

    // --------------------------------- SUCCESS MESSAGES ----------------------------------------
    const MESSAGE_SEND = "Message received";

    private static $isReqiredErrors = [
        FieldsEnum::NAME => self::NAME,
        FieldsEnum::AGE => self::AGE_REQUIRED,
        FieldsEnum::LOCATION => self::LOCATION_REQUIRED,
        FieldsEnum::EMAIL => self::EMAIL_REQUIRED,
        FieldsEnum::CONCERNS => self::CONCERNS_REQUIRED,
        FieldsEnum::DATE => self::DATE_REQUIRED,
        FieldsEnum::INJURY_REASON => self::INJURY_REASON_REQUIRED,
        FieldsEnum::SOLID_CONCERN => self::SOLID_CONCERN_REQUIRED,
        FieldsEnum::MESSAGE => self::MESSAGE_IS_REQUIRED
    ];

    private static $numbersOnlyErrors = [
        FieldsEnum::AGE => self::NUMBERS_ONLY,
        FieldsEnum::DATE => self::NUMBERS_ONLY
    ];

    public static function isRequiredError(string $field): string
    {
        return self::$isReqiredErrors[$field];
    }

    public static function numbersOnlyError(string $field): string
    {
        return self::$numbersOnlyErrors[$field];
    }
}