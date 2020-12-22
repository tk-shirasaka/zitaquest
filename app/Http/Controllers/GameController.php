<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Record;
use App\Models\Quest;

class GameController extends Controller
{
    public function index()
    {
        return Game::orderBy('id', 'desc')->firstOrNew()->load(['active', 'records']);
    }

    public function store()
    {
        $game = Game::create(['state' => 1]);
        $game->records()->saveMany(
            Quest::pluck('id')->map(function ($questId, $key) {
                return new Record(['quest_id' => $questId, 'state' => $key ? 0 : 1]);
            })
        );

        $game->load('records');

        return $game;
    }

    public function find()
    {
        $params = request()->input();
        $game = Game::find(['state' => 1]);

        if ($game->active->quest->code !== $params['code']) {
            throw new \Exception;
        }

        $game->active->state = 2;
        $game->active->find_point = $params['find_point'];
        $game->active->find_time = $params['find_time'];
        $game->active->save();
        $game->load(['active', 'records']);

        return $game;
    }

    public function answer()
    {
        $params = request()->input();
        $game = Game::find(['state' => 1]);

        if ($game->active->quest->code !== $params['code']) {
            throw new \Exception;
        }

        $game->active->state = 3;
        $game->active->find_point = $params['find_point'];
        $game->active->find_time = $params['find_time'];
        $game->active->save();
        $game->load(['active', 'records']);

        if (empty($game->active)) {
            $game->state = 2;
            $game->save();
        }

        return $game;
    }
}
