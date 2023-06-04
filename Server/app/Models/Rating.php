<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'entry_id', 'rating'];

    public function entry() : BelongsTo{
        return $this->belongsTo(Entry::class);
    }

    public function user() : BelongsTo{
        return $this->belongsTo(User::class);
    }
}
