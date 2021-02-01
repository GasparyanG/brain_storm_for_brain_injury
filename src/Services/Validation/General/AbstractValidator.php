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

    private function addError(string $message, string $name): void
    {
        $this->customErrors[] = [
            FieldsEnum::MESSAGE => [$name => $message]
        ];
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
        if (!$this->isFieldExists($assocArray, FieldsEnum::EMAIL)) return false;

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

    protected function isValidDateMDY(array $assocArray): bool
    {
        // TODO: implement isValidDateMDY.
    }
}