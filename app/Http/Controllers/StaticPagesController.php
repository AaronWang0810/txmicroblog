<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StaticPagesController extends Controller
{
    public function home()
    {
    	return view('static_pages/home');
    }

    public function mentions()
    {
    	return view('static_pages/mentions');
    }

    public function message()
    {
    	return view('static_pages/message');
    }

    public function audience()
    {
    	return view('static_pages/audience');
    }
}
