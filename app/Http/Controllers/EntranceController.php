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
        $entrance = Entrance::findOrFail($id);

        $entrance->update($request->all());
        return response()->json(['message' => 'Entrance updated successfully'], 200);
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
