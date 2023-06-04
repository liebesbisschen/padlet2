<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Padlet extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'user_id', 'is_public', 'image'];

    public function user() : BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function entries() : HasMany{
        return $this->hasMany(Entry::class);
    }

    public function rights() : HasMany{
        return $this->hasMany(Right::class);
    }
}
