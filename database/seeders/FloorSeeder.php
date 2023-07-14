<?php

namespace Database\Seeders;

use App\Models\Entrance;
use App\Models\Floor;
use Illuminate\Database\Seeder;

class FloorSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $entrances = Entrance::where('total_floors', '>', 0)->get();

        foreach ($entrances as $entrance) {
            for ($i = 0; $i < $entrance->total_floors; $i++) {
                Floor::factory()->create(['entrance_id' => $entrance->id]);
            }
        }
    }
}
