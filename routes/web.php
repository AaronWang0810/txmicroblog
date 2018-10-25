<?php

Route::get('/', 'StaticPagesController@home');
Route::get('/mentions', 'StaticPagesController@mentions');
Route::get('/message', 'StaticPagesController@message');
Route::get('/audience', 'StaticPagesController@audience');