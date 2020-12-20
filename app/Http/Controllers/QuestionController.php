<?php

namespace App\Http\Controllers;

use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return Question::all()->keyBy('id');
    }

    public function store()
    {
        $params = request()->all();
        return Question::updateOrCreate(['id' => $params['id'] ?? null], $params);
    }
}
