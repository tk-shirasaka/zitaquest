<?php

namespace App\Http\Controllers;

use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return Question::all();
    }

    public function store()
    {
        $params = request()->all();
        $model = Question::firstOrNew(['id' => $params['id'] ?? null]);

        return $model->save($params);
    }
}
