<?php

namespace App\Http\Controllers;

use App\FormLogin;
use function GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function loginForm()
    {
        return view('LoginForm');
    }

    public function signin(Request $request)
    {
        $form = FormLogin::whereEmail($request->_username)->first();
        if(!$form)
        {
            $r=['e'=>true,'d'=>['_username'=>'Username does not exist']];
            return response()->json($r);
        }
        if(!Hash::check($request->_pass,$form->cpass))
        {
            $r=['e'=>true,'d'=>['_pass'=>'Password does not exist']];
            return response()->json($r);
        }
        $r=['e'=>false,'d'=>'Login Successful','r'=>route('form')];
        return response()->json($r);
    }
}
