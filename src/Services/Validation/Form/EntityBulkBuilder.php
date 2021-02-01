<?php

namespace App\Services\Validation\Form;

class EntityBulkBuilder
{
    private array $assocArrayForm;

    public function __construct(array $assocArrayForm)
    {
        $this->assocArrayForm = $assocArrayForm;
    }


}