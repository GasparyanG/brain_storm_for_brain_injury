<?php


namespace App\Services\Validation\General;


abstract class AbstractValidator
{
    protected array $customErrors = [];
    protected bool $persistenceError = false;   // Initially there is no persistence error.

    // ----------------------------------- GENERAL ------------------------------------
    protected function isFieldExists(array $assocArray, string $keyToAssoc): bool
    {
        // Field doesn't exists.
        if (!isset($assocArray[$keyToAssoc])) {
            $this->addError(ErrorEnum::isRequiredError($keyToAssoc), $keyToAssoc);
            return false;
        }

        return true;
    }

    protected function addError(string $message, string $name): void
    {
        $this->customErrors[$name] =
            [FieldsEnum::MESSAGE => $message];
    }

    private function numbersOnly(array $assocArray, string $keyToAssoc): bool
    {
        if (is_numeric($assocArray[$keyToAssoc])) return true;

        $this->addError(ErrorEnum::numbersOnlyError($keyToAssoc), $keyToAssoc);
        return false;
    }

    // ----------------------------------- STRINGS ------------------------------------
    protected function stringIsNotEmpty(array $assocArray, string $keyToAssoc): bool
    {
        // Field doesn't exists.
        if (!$this->isFieldExists($assocArray, $keyToAssoc)) return false;

        // Empty string.
        if (strlen($assocArray[$keyToAssoc]) === 0) {
            $this->addError(ErrorEnum::isRequiredError($keyToAssoc), $keyToAssoc);
            return false;
        }

        return true;
    }

    protected function isValidEmailAddress(array $assocArray): bool
    {
        // Field doesn't exists.
        if (!$this->isFieldExists($assocArray, FieldsEnum::EMAIL)) {
            $this->addError(ErrorEnum::isRequiredError(FieldsEnum::EMAIL), FieldsEnum::EMAIL);
            return false;
        }

        // TODO: Implement email address validation.
        return true;
    }


    // ----------------------------------- NUMBERS ------------------------------------
    protected function isValidAge(array $assocArray): bool
    {
        if (!$this->isFieldExists($assocArray, FieldsEnum::AGE)) return false;
        if (!$this->numbersOnly($assocArray, FieldsEnum::AGE)) return false;

        $age = $assocArray[FieldsEnum::AGE];
        if ($age <= SymbolicConstantsEnum::MIN_AGE || $age > SymbolicConstantsEnum::MAX_AGE) {
            $this->addError(ErrorEnum::AGE_OUT_OF_RANGE, FieldsEnum::AGE);
            return false;
        }

        return true;
    }

    protected function isValidDateMDY(array $assocArray, string &$date): bool
    {
        if (!$this->isValidNumericValue($assocArray, FieldsEnum::INJURY_DATE_DAY)
            || !$this->isValidNumericValue($assocArray, FieldsEnum::INJURY_DATE_MONTH)
            || !$this->isValidNumericValue($assocArray, FieldsEnum::INJURY_DATE_YEAR)) {
            $this->addError(ErrorEnum::FILL_DATE_ENTIRELY, FieldsEnum::DATE);
            return false;
        }

        $day = $assocArray[FieldsEnum::INJURY_DATE_DAY];
        $month = $assocArray[FieldsEnum::INJURY_DATE_MONTH];
        $year = $assocArray[FieldsEnum::INJURY_DATE_YEAR];

        if (!$this->isValidDay($day) || !$this->isValidMonth($month) || !$this->isValidYear($year)) {
            $this->addError(ErrorEnum::DATE_WRONG, FieldsEnum::DATE);
            return false;
        }

        $date = strtotime("$day-$month-$year");
        return true;
    }

    private function isValidNumericValue(array $assocArray, string $field): bool
    {
        if (!isset($assocArray[$field]) || !is_numeric($assocArray[$field])) return false;
        return true;
    }

    private function isValidDay(int $day): bool
    {
        if ($day < SymbolicConstantsEnum::DAY_MIN || $day > SymbolicConstantsEnum::DAY_MAX) {
            $this->addError(ErrorEnum::DATE_WRONG, FieldsEnum::DATE);
            return false;
        }

        return true;
    }

    private function isValidMonth(int $month): bool
    {
        if ($month < SymbolicConstantsEnum::MONTH_MIN || $month > SymbolicConstantsEnum::MONTH_MAX) {
            $this->addError(ErrorEnum::DATE_WRONG, FieldsEnum::DATE);
            return false;
        }

        return true;
    }

    private function isValidYear(int $year): bool
    {
        if ($year < SymbolicConstantsEnum::YEAR_MIN || $year > SymbolicConstantsEnum::YEAR_MAX) {
            $this->addError(ErrorEnum::DATE_WRONG, FieldsEnum::DATE);
            return false;
        }

        return true;
    }
}