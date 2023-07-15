<?php

namespace App\Interfaces;

use App\Models\Entrance;
use App\Models\House;

interface EntranceBuilderInterface extends BaseInterface
{
    public function setHouse(House $house): self;
    public function setTotalFloors(int $total_floors): self;
    public function setFloor(int $total_apartments, Entrance $entrance = null): EntranceBuilderInterface;
    public function build(): Entrance;
}
