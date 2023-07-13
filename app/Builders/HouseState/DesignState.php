<?php

namespace App\Builders\HouseState;

use App\Interfaces\HouseStateInterface;

class DesignState implements HouseStateInterface
{
    public function getState(): string
    {
        return 'design';
    }
}
