<?php


namespace App\Services\Validation\General;

class FieldsEnum
{
    // FORM
    const FORM = "form";
    const NAME = "name";
    const AGE = "age";
    const EMAIL = "email";
    const LOCATION = "location";
    const CONCERNS = "concerns";
    const SOLID_CONCERN = "solid_concern";
    const CONCERN_OTHER = "concern_other";
    const DATE = "date";                                // Date's general name for errors.
    const INJURY_DATE_DAY = "injury_date_day";
    const INJURY_DATE_MONTH = "injury_date_month";
    const INJURY_DATE_YEAR = "injury_date_year";
    const INJURY_REASON = "injury_reason";

    // NAVIGATION
    const NAVIGATION = "navigation";
    const CURRENT_POSITION = "current_position";
    const MAX_NUMBER_OF_PAGES = "max_number_of_pages";

    // ERRORS
    const ERRORS = "errors";
    const MESSAGE = "message";
}