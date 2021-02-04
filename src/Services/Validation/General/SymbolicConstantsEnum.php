<?php


namespace App\Services\Validation\General;


class SymbolicConstantsEnum
{
    // Pages and Navigation
    const PAGE_INITIAL_POSITION = 0;
    const MAX_NUMBER_OF_PAGES = 6;          // From 0 to 6.
    const MAX_NUMBER_OF_PAGES_HUMAN = 7;    // From 1 to 7 (thus human indexing).

    // Age Range
    const MIN_AGE = 0;
    const MAX_AGE = 150;

    // Injury Reason Range
    const MIN_INJURY_REASON = 1;
    const MAX_INJURY_REASON = 5;

    // Concern Range
    const MIN_CONCERN = 1;
    const MAX_CONCERN = 12;
    const MAX_CONCERN_CHOICES = 3;

    // Date
    const DAY_MIN = 1;
    const DAY_MAX = 31;
    const MONTH_MAX = 12;
    const MONTH_MIN = 1;
    const YEAR_MIN = 1920;         // For 100 years old people.
    const YEAR_MAX = 2021;         // Update every year or take dynamically.

    // User Message
    const MAX_NUMBER_OF_CHARACTERS = 4000;

    private static array $pageAndNumber = [
        FieldsEnum::NAME => 0,
        FieldsEnum::AGE => 1,
        FieldsEnum::LOCATION => 2,
        FieldsEnum::EMAIL => 3,
        FieldsEnum::DATE => 4,
        FieldsEnum::INJURY_REASON => 5,
        FieldsEnum::CONCERNS => 6,
        FieldsEnum::SOLID_CONCERN => 6
    ];

    public static function getPageNumber(string $key): int
    {
        return self::$pageAndNumber[$key];
    }
}