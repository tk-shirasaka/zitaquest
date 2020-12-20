<?php

namespace App\Http\Controllers;

use App\Models\Quest;

class QuestController extends Controller
{
    public function index()
    {
        return Quest::all()->keyBy('id');
    }

    public function store()
    {
        $params = request()->all();
        $model = Quest::firstOrNew(['id' => $params['id'] ?? null], $params);

        return $model->save();
    }
}
