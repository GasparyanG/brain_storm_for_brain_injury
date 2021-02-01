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

    // Date
    const DAY_MIN = 1;
    const DAY_MAX = 31;
    const MONTH_MAX = 12;
    const MONTH_MIN = 1;
    const YEAR_MIN = 1920;         // For 100 years old people.
    const YEAR_MAX = 2021;         // Update every year or take dynamically.
}