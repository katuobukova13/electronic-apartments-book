<?php

namespace App\Factories;

use App\Builders\EntranceBuilder;
use App\Models\Entrance;
use App\Models\House;

class EntranceBuilderFactory
{
    public static function create($id, $total_floors, $total_apartments): Entrance
    {
        $builder = new EntranceBuilder();

        $house = House::find($id);

        $builder->setHouse($house);

        $builder->setTotalFloors($total_floors);

        for ($floor_index = 0; $floor_index < $total_floors; $floor_index++) {
            $builder->setFloor($total_apartments);
        }

        return $builder->build();
    }
}
