<?php

namespace App\Http\Controllers;

use App\Models\Quest;

class QuestController extends Controller
{
    public function index()
    {
        return Quest::all();
    }

    public function store()
    {
        $params = request()->all();
        $model = Quest::firstOrNew(['id' => $params['id'] ?? null]);

        return $model->save($params);
    }
}
