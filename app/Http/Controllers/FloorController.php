<?php

namespace App\Http\Controllers;

use App\Models\Floor;
use Illuminate\Http\Request;

class FloorController extends Controller {
    public function store(Request $request) {
        Floor::create([
            'total_apartments' => $request['total_apartments'],
            'entrance_id' => $request['entrance_id'],
            ]);
        return response()->json(['message' => 'Entrance created successfully'], 201);
    }

    public function update(Request $request, int $id, int $entrance_id, int $floor_id) {
        $floor = Floor::find($floor_id);

        if ($floor) {
            $floor->update(['total_apartments' => $request['total_apartments']]);
            return $floor;
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }

    public function destroy(int $id, int $entrance_id, int $floor_id) {
        $floor = Floor::find($floor_id);

        if ($floor) {
            $floor->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }
}
