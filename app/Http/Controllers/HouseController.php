<?php

namespace App\Http\Controllers;

use App\Factories\HouseBuilderFactory;
use App\Models\House;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function index() {
        return House::with(['entrances.floors'])->get();
    }

//    public function store(Request $request) {
//        $house = HouseBuilderFactory::create($request['state'], $request['total_floors'], $request['total_apartments']);
//        $house->save();
//    }

    public function show(House $house) {

        return $house->load(['entrances.floors']);
    }
//
//    public function update(Request $request, House $house) {
//        $house->update($request->all());
//        return response()->json($house, 200);
//    }
//
    public function destroy($id)
    {
        $house = House::find($id);

        if ($house) {
            $house->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }
}
