<?php

namespace App\Http\Controllers;

use App\Models\Floor;
use Illuminate\Http\Request;

class FloorController extends Controller {

    public function store(Request $request) {
        Floor::create($request['total_apartments'], $request['entrance_id']);
        return response()->json(['message' => 'Entrance created successfully'], 201);
    }

    public function update(Request $request, int $id) {
        $floor = Floor::findOrFail($id);

        $floor->update($request->all());
        return response()->json(['message' => 'Entrance updated successfully'], 200);
    }

    public function destroy(int $id) {
        $floor = Floor::find($id);

        if ($floor) {
            $floor->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }
}
