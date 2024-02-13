<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
    public function createUser(Request $request){
            try{
                $validator = Validator::make($request->all(),[
                    'name' => 'required',
                    'email'=>'required|email|unique:users,email',
                    'password'=> 'required'
                ]);
                //-------
                if($validator->fails()){
                    return response()->json([
                        'status'  => false,
                        'message' => 'validate error',
                        'errors'  => $validator->errors()
                    ],401);
                }
                $user = User::create([
                    'name'    => $request->name,
                    'email'   => $request->email,
                    'password'=> Hash::make($request->password),
                ]);
                return response()->json([
                    'status'  => true,
                    'message' => 'User Created Successfully',
                    'token'   => $user->createToken('API TOKEN')->plainTextToken,
                    'user'    => [
                        'name'  => $user->name,
                        'email' => $user->email
                    ]
                ],200);
            }catch(\Throwable $e){
                return response()->json([
                    'status'  => false,
                    'message' => $e->getMessage(),
                ],500);
            }
    }


    function loginUser(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'email'=>'required|email',
                'password'=> 'required'
            ]);
            //-------
            if($validator->fails()){
                return response()->json([
                    'status'  => false,
                    'message' => 'validate error',
                    'errors'  => $validator->errors()
                ],401);
            }
            //----------- login 
            if(!Auth::attempt($request->only(['email','password']))){
                return response()->json([
                    'status'  => false,
                    'message' => 'Email or Password does not match our records ',
                ],401);
            }
            //-----------
            $user = User::where('email',$request->email)->first();
            //-----------
            return response()->json([
                'status'  => true,
                'message' => 'User Logged In Successfully',
                'token'   => $user->createToken('API TOKEN')->plainTextToken
            ],200);
        }catch(\Throwable $e){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }

    
}
