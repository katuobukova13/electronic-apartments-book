<?php

namespace Database\Factories;

use App\Models\Entrance;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class FloorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'entrance_id' => Entrance::all()->random()->id,
            'total_apartments' => fake()->numberBetween(1, 10),
        ];
    }
}
