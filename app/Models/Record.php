<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'quest_id',
        'state',
    ];

    protected $appends = [
        'state_name',
    ];

    public function getStateNameAttribute()
    {
        $status = $this->state;
        if ($status === 0) return '待機';
        if ($status === 1) return '捜索中';
        if ($status === 2) return '解答中';
        if ($status === 3) return '終了';
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
