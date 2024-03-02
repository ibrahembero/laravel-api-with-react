<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;


class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    /**
     * register function.
     */
    public function register(Request $request){

        $validateUser = Validator::make($request->all(),[
            'name'=> 'required',
            'email'=> 'required|email|unique:users',
            'password'=> 'required'
        ]);
        if($validateUser->fails()){
            return response()->json([
                "status" => false,
                "message"=>"validation error",
                "errors"=> $validateUser->errors()
            ],401);
        }
        $user = User::create([
            "name" => $request->name,
            "email"=>$request->email,
            "password"=> $request->password
        ]);
        return response()->json([
            "status" => true,
            "message"=>"User Created Successfully",
            "token"=>$user->createToken('token')->plainTextToken,
            "user"=>$user
        ],200);
    }

    /**
     * Login function.
     */
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        // ($request->password != $user->password)
        if (!$user || !Hash::check($request->password,$user->password) ) {
            return response()->json([
                        "success" => false,
                        "status"=>200,
                        "message"=>"No such user found"
                    ]);
         }
        $token =$user->createToken('token');

        return $token->plainTextToken;
    }
    /**
     * Logout function.
     */
    public function logout(Request $request){
        //auth('sanctum')->user()->tokens()->delete();
        auth('sanctum')->user()->currentAccessToken()->delete();
       return response()->json([
            "message" => "User Successfully Logged Out"
        ],200);

    }
    /**
     * personal info function.
     */
    public function getPersonalInfo(Request $request){
        // $token = $request->token;
        $user = auth('sanctum')->user();
        if($user){
            return response()->json([
                "message" => "User Info Successfully displayed",
                "user"=>  $user
            ],200);
        }else{
            return response()->json([
                "message" => "No User Found",
                "user"=>  $user
            ],404);
        }




        // $userToken->tokenable_id;
        //$token_data = DB::table('personal_access_tokens')->where('token',hash('sha256',$token))->first();
        //$user_id = $token_data->tokenable_id;
        // return hash('sha256',$token);
        // $user = auth('sanctum')->user();
        // if($token){
        //     return response()->json([
        //                 "message" => "User Info Successfully displayed",
        //                 "user"=>  $user
        //             ],200);
        // }else{
        //     return response()->json([
        //                 "message" => "No User Found",
        //                 "user"=>  null
        //             ],404);
        // }


    }
    // $user = auth('sanctum')->user();
    //     if($user){
    //         return response()->json([
    //             "message" => "User Info Successfully displayed",
    //             "user"=>  $user
    //         ],200);
    //     }else{
    //         return response()->json([
    //             "message" => "No User Found",
    //             "user"=>  $user
    //         ],404);
    //     }
    /**
     * upload photo function.
     */
    public function uploadPhoto(Request $request){
        //return $request->image;
        // $img = $request->image;
        // if($img){
        //     return "there is image".' '.$img;
        // }else{
        //     return "there is no image";
        // }
        $user= auth('sanctum')->user();
        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
        $imageName;
        $user->update([
            "image"=>$imageName
        ]);
        // Save Image in Storage Folder
        Storage::disk('public')->put( $imageName, file_get_contents($request->image) );
        // return Json Response
        return response()->json([
            "message" => "Image Uploaded Successfully"
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
