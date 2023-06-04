<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function rights() : HasMany{
        return $this->hasMany(Right::class);
    }
    public function padlets() : HasMany{
        return $this->hasMany(Padlet::class);
    }
    public function entries() : HasMany{
        return $this->hasMany(Entry::class);
    }
    public function comments() : HasMany{
        return $this->hasMany(Comment::class);
    }

    public function ratings() : HasMany{
        return $this->hasMany(Rating::class);
    }

    /* ---- auth JWT ---- */ /**
 * @return mixed
 */
    public function getJWTIdentifier()
    {
        return $this->getKey(); }
    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id]]; }

}
