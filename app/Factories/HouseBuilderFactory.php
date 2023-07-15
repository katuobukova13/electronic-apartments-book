<?php

namespace App\Factories;

use App\Builders\HouseBuilder;
use App\Models\House;

class HouseBuilderFactory
{
    public static function create($state, $entrances, $total_floors, $total_apartments): House
    {
        $builder = new HouseBuilder();

        $builder->setHouseState($state);

       for ($entrance_index = 0; $entrance_index < $entrances; $entrance_index++) {
            $entrance = $builder->setEntrance($total_floors);
            for ($floor_index = 0; $floor_index < $total_floors; $floor_index++) {
                $builder->setFloor($total_apartments, $entrance);
            }
        }

        return $builder->build();
    }
}
