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

        if (isset($params['id'])) {
            return Question::find($params['id'])->fill($params)->save();
        } else {
            return Question::create($params);
        }
    }
}
