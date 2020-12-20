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
        $model = Question::firstOrNew(['id' => $params['id'] ?? null], $params);

        return $model->save();
    }
}
