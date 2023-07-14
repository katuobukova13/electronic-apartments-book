<?php

namespace Database\Factories;

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
            'total_apartments' => $this->faker->numberBetween(1, 5),
        ];
    }
}
