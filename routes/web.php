<?php

Route::get('/', 'UsersController@login')->name('login');
Route::get('/login_form', 'UsersController@login_form')->name('login_form');
Route::get('/register', 'UsersController@register')->name('register');
Route::get('/register_form', 'UsersController@register_form')->name('register_form');

Route::get('/home', 'StaticPagesController@home')->name('home');
Route::get('/mentions', 'StaticPagesController@mentions')->name('mentions');
Route::get('/message', 'StaticPagesController@message')->name('message');
Route::get('/audience', 'StaticPagesController@audience')->name('audience');