<?php

namespace App\Http\Controllers;

use App\Factories\HouseBuilderFactory;
use App\Models\House;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

//    public function update(Request $request, House $house) {
//        $validatedData = $request->validate([
//            'state' => 'required|string',
//            'entrances' => 'required|array',
//            'entrances.*.total_floors' => 'required|integer',
//            'entrances.*.floors' => 'required|array',
//            'entrances.*.floors.*.total_apartments' => 'required|integer'
//        ]);
//
//        DB::transaction(function () use ($validatedData, $id) {
//            $house = House::findOrFail($id);
//            $house->state = $validatedData['state'];
//            $house->save();
//
//            foreach ($validatedData['entrances'] as $entranceData) {
//                $entrance = Entrance::updateOrCreate(
//                    ['id' => $entranceData['id']],
//                    ['total_floors' => $entranceData['total_floors']]
//                );
//
//                foreach ($entranceData['floors'] as $floorData) {
//                    $floor = Floor::updateOrCreate(
//                        ['id' => $floorData['id']],
//                        ['total_apartments' => $floorData['total_apartments']]
//                    );
//
//                    // update apartments here if necessary
//                }
//            }
//        });
//
//        return new HouseResource(House::findOrFail($id));
//    }

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
