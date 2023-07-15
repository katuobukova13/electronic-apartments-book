<?php

namespace App\Interfaces;

use App\Models\Entrance;
use App\Models\House;

interface BaseInterface
{
    public function setFloor(int $total_apartments, Entrance $entrance = null): BaseInterface;
    public function build(): House|Entrance;
}
