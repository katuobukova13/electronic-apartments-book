<?php

namespace Database\Factories;

use App\Models\House;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class EntranceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'house_id' => House::all()->random()->id,
            'total_floors' => fake()->numberBetween(1, 5),
        ];
    }
}
