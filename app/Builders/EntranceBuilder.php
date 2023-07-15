<?php

namespace App\Builders;

use App\Interfaces\EntranceBuilderInterface;
use App\Models\Entrance;
use App\Models\Floor;
use App\Models\House;

class EntranceBuilder implements EntranceBuilderInterface {
    private Entrance $entrance;

    public function __construct()
    {
        $this->entrance = new Entrance();
    }

    public function setHouse(House $house): EntranceBuilderInterface
    {
        $this->entrance->house()->associate($house);
        return $this;
    }

    public function setTotalFloors(int $total_floors): EntranceBuilderInterface
    {
        $this->entrance->total_floors = $total_floors;
        $this->entrance->save();
        return $this;
    }
    public function setFloor(int $total_apartments, Entrance $entrance = null): EntranceBuilderInterface
    {
        $floor = new Floor(['total_apartments' => $total_apartments]);
        $this->entrance->floors()->save($floor);
        return $this;
    }

    public function build(): Entrance
    {
        return $this->entrance;
    }

}
