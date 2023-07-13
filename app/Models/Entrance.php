<?php

namespace  App\Models;

use Illuminate\Database\Eloquent\Model;

class Entrance extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'total_floors',
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'house_id',
        'created_at',
        'updated_at',
        ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function floors()
    {
        return $this->hasMany(Floor::class);
    }
}
