<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function login()
    {
    	return view('users.login');
    }

    public function login_form()
    {
    	return view('users.login_form');
    }

    public function register()
    {
    	return view('users.register');
    }

    public function register_form()
    {
    	return view('users.register_form');
    }

    
}
