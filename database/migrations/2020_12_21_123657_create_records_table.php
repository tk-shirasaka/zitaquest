<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->references('id')->on('games');
            $table->foreignId('quest_id')->references('id')->on('quests');
            $table->tinyInteger('state')->default(0);
            $table->smallInteger('find_point')->default(0);
            $table->string('find_time', 10)->nullable();
            $table->smallInteger('answer_point')->default(0);
            $table->string('answer_time', 10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
}
