<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders');
            $table->foreignId('menu_item_id')->constrained('menu_items');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_details');
    }
}
