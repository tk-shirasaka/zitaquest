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
        collect(request()->all())->map(function($params, $no) {
            $params['no'] = $no + 1;
            Quest::updateOrCreate(['id' => $params['id'] ?? null], $params);
        });

        return Quest::all();
    }
}
