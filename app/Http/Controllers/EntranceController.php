<?php

namespace App\Http\Controllers;

use App\Models\Entrance;
use Illuminate\Http\Request;

class EntranceController extends Controller
{
    public function show(int $id, int $entrance_id)
    {
        $entrance = Entrance::find($entrance_id);

        if ($entrance) {
            return $entrance->load(['floors']);
        } else {
            return response()->json(['error' => 'Entrance not found'], 404);
        }
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        Entrance::create([
            'total_floors' => $request['total_floors'],
            'house_id' => $request['house_id']]);

        return response()->json(['message' => 'Entrance created successfully'], 201);
    }

    public function update(Request $request, int $id, int $entrance_id)
    {
        $entrance = Entrance::find($entrance_id);

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

    public function destroy($id, $entrance_id): \Illuminate\Http\JsonResponse
    {
        $entrance = Entrance::find($entrance_id);

        if ($entrance) {
            $entrance->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'House not found'], 404);
        }
    }
}
