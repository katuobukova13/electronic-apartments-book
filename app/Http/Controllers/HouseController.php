<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function index() {
        return House::with(['entrances.floors'])->get();
    }

    public function store(Request $request) {
        House::create($request['state']);

        return response()->json(['message' => 'House created successfully'], 201);
    }

    public function show(House $house) {

        return $house->load(['entrances.floors']);
    }

    public function update(Request $request, $id) {
        $house = House::find($id);

        if ($house) {
            $house->update(['state' => $request['state']]);
            return $house->load(['entrances.floors']);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }

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
