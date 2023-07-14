<?php

namespace Database\Factories;

use App\Builders\HouseState\ConstructionState;
use App\Builders\HouseState\DesignState;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class HouseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'state' => fake()->randomElement([(new ConstructionState)->getState(), (new DesignState)->getState()]),
        ];
    }
}
