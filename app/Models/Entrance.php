<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entrance extends Model
{
    use HasFactory;

    protected $fillable = ['total_floors'];

    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class);
    }

    public function floors(): HasMany
    {
        return $this->hasMany(Floor::class);
    }
}
