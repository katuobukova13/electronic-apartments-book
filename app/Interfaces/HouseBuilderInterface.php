<?php

namespace App\Interfaces;

use App\Models\Entrance;
use App\Models\House;

interface HouseBuilderInterface
{
    public function setHouseState(HouseStateInterface $state): HouseBuilderInterface;
    public function setEntrance(int $total_floors): Entrance;
    public function setFloor(Entrance $entrance, int $total_apartments): HouseBuilderInterface;
    public function buildHouse(): House;
}
