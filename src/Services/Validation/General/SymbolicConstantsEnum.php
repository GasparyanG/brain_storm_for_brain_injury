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
}