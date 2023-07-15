<?php

namespace App\Interfaces;

use App\Models\Entrance;
use App\Models\House;

interface HouseBuilderInterface extends BaseInterface
{
    public function setHouseState(HouseStateInterface $state): HouseBuilderInterface;
    public function setEntrance(int $total_floors): Entrance;
    public function setFloor(int $total_apartments, Entrance $entrance = null): HouseBuilderInterface;
    public function build(): House;
}
