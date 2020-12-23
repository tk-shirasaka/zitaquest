<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'state',
    ];

    protected $attributes = [
        'state' => 0,
    ];

    protected $appends = [
        'state_name',
    ];

    public function getStateNameAttribute()
    {
        $status = $this->state;
        if ($status === 0) return '待機';
        if ($status === 1) return 'プレイ中';
        if ($status === 2) return '終了';
    }

    public function active()
    {
        return $this->hasOne(Record::class)->whereIn('state', [0, 1])->orderBy('id');
    }

    public function records()
    {
        return $this->hasMany(Record::class);
    }
}
