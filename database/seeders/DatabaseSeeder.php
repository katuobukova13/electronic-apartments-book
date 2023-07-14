<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Entrance;
use App\Models\Floor;
use App\Models\House;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       House::factory(5)->create();

       Entrance::factory(5)->create();

        $this->call([
            FloorSeeder::class,
        ]);
    }
}
