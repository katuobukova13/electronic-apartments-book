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
        $total_apartments = 0;
        $entrance = Entrance::where('total_floors', '>', 0)->get()->random();

        if ($entrance->total_floors > 0) {
            $a = fake()->numberBetween(1, 5);
        }

        return [
            'entrance_id' => $entrance->id,
            'total_apartments' => $total_apartments,
        ];
    }
}
