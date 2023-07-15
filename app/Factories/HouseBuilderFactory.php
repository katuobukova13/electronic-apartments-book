<?php

namespace App\Factories;

use App\Builders\HouseBuilder;
use App\Models\House;

class HouseBuilderFactory
{
    public static function create($state, $total_floors, $total_apartments): House
    {
        $builder = new HouseBuilder();

        $builder->setHouseState($state);

        $entrance = $builder->setEntrance($total_floors);

        for ($i = 0; $i < $entrance->total_floors; $i++) {
            $builder->setFloor($entrance, $total_apartments);
        }

        return $builder->buildHouse();
    }
}
