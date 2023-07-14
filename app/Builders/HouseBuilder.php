<?php

namespace App\Builders;

use App\Interfaces\HouseBuilderInterface;
use App\Models\Entrance;
use App\Models\Floor;
use App\Models\House;

class HouseBuilder implements HouseBuilderInterface {
    private House $house;

    public function __construct()
    {
        $this->house = new House;
    }

    public function setHouseState($state): HouseBuilderInterface
    {
        $this->house->state = $state;
        $this->house->save();

        return $this;
    }

    public function setEntrance($total_floors): Entrance
    {
        $entrance = new Entrance(['total_floors' => $total_floors]);
        $this->house->entrances()->save($entrance);
        return $entrance;
    }

    public function setFloor(Entrance $entrance, $total_apartments): HouseBuilderInterface
    {
        $floor = new Floor(['total_apartments' => $total_apartments]);
        $entrance->floors()->save($floor);
        return $this;
    }

    public function buildHouse(): House
    {
        return $this->house;
    }
}
