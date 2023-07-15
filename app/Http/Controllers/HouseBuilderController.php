<?php

namespace App\Http\Controllers;

use App\Factories\HouseBuilderFactory;
use Illuminate\Http\Request;

class HouseBuilderController extends Controller
{
    public function store(Request $request) {
        $house = HouseBuilderFactory::create($request['state'], $request['total_floors'], $request['total_apartments']);
        $house->save();
    }
}
