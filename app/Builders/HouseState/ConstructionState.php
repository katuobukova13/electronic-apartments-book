<?php

namespace App\Builders\HouseState;

use App\Interfaces\HouseStateInterface;

class ConstructionState implements HouseStateInterface
{
    public function getState(): string
    {
        return 'construction';
    }
}
