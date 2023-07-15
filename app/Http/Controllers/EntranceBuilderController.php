<?php

namespace App\Http\Controllers;

use App\Factories\EntranceBuilderFactory;
use Illuminate\Http\Request;

class EntranceBuilderController extends Controller
{
    public function store(Request $request): void
    {
        $entrance = EntranceBuilderFactory::create(
            $request->id,
            $request->total_floors,
            $request->total_apartments
        );
        $entrance->save();
    }
}
