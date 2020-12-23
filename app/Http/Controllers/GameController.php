<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Record;
use App\Models\Quest;

class GameController extends Controller
{
    private function loadRelation($game)
    {
        return $game->load([
            'active.question',
            'active.quest',
            'records',
        ]);
    }

    public function index()
    {
        return $this->loadRelation(Game::orderBy('id', 'desc')->firstOrNew());
    }

    public function store()
    {
        $game = Game::create(['state' => 1]);
        $game->records()->saveMany(
            Quest::all(['id', 'question_id'])->map(function ($record, $key) {
                return new Record(['quest_id' => $record->id, 'question_id' => $record->question_id, 'state' => $key ? 0 : 1]);
            })
        );

        return $this->loadRelation($game);
    }

    public function find()
    {
        $params = request()->input();
        $game = Game::where('state', 1)->first();

        if ($game->active->quest->code !== $params['code']) {
            throw new \Exception;
        }

        $game->active->state = 2;
        $game->active->save();

        return $this->loadRelation($game);
    }

    public function answer()
    {
        $params = request()->input();
        $game = Game::where('state', 1)->first();

        if ($game->active->quest->code !== $params['answer']) {
            throw new \Exception;
        }

        $game->active->state = 3;
        $game->active->save();
        $game = $this->loadRelation($game);

        if (empty($game->active)) {
            $game->state = 2;
            $game->save();
        }

        return $game;
    }
}
