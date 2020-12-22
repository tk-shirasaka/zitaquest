<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
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
            if (isset($params['id'])) {
                Quest::find($params['id'])->fill($params)->save();
            } else {
                Quest::create($params + ['code' => Str::uuid()]);
            }
        });

        return Quest::all();
    }
}
