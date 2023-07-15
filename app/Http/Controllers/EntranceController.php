<?php

namespace App\Http\Controllers;

use App\Models\Entrance;
use Illuminate\Http\Request;

class EntranceController extends Controller
{
    public function store(Request $request)
    {
        Entrance::create($request['total_floors'], $request['house_id']);

        return response()->json(['message' => 'Entrance created successfully'], 201);
    }

    public function update(Request $request, int $id)
    {
        $entrance = Entrance::find($id);

        if ($entrance) {
            $entrance->update([
                'total_floors' => $request['total_floors'],
                'house_id' => $request['house_id'],
            ]);

            return $entrance->load(['floors']);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }

    public function destroy($id)
    {
        $entrance = Entrance::find($id);

        if ($entrance) {
            $entrance->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }
}
