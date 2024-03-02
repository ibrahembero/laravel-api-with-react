<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
    /**
     * get All  posts
     */
    public function getAllPosts()
    {
        $posts = Post::all();
        return response()->json([
            "posts"=>$posts
        ],200);
    }
    /**
     * get User  posts
     */
    public function getUserPosts()
    {

        $user_id = auth('sanctum')->user()->id;
        $posts = Post::select('name','description','user_id')
        ->where('user_id',$user_id)->get();
        return response()->json([
            "posts"=>$posts
        ],200);
    }
    /**
     * create new  post
     */
    public function createPost(Request $request)
    {
        $post = Post::create([
            "name" => $request->name,
            "description"=>$request->description,
            "user_id"=> auth('sanctum')->user()->id
        ]);
        return response()->json([
            "status" => true,
            "message"=>"Post Created Successfully",
            "name"=>$post->name
        ],200);
    }
    /**
     * edit post Info
     */
    public function editPost(Request $request,$post_id)
    {
        $post = Post::find($post_id);

        return $post;
    }
    /**
     * update post Info
     */
    public function updatePost(Request $request,$post_id)
    {
        $post = Post::find($post_id);
        $post->update([
            "name" => $request->name,
            "description"=>$request->description
        ]);
        return response()->json([
            "status" => true,
            "message"=>"Post Updated Successfully",
            "name"=>$post->name,
            "description"=>$post->description
        ],200);
    }
    /**
     * Delete post
     */
    public function deletePost($post_id)
    {
        $post = Post::find($post_id);
        $user_id = auth('sanctum')->user()->id;
        if($post == null){
            return response()->json([
                "status" => false,
                "message"=>"no post available"
            ],404);
        }
        if($user_id == $post->user_id){
            $post->delete();
            return response()->json([
                "status" => true,
                "message"=>"Post Deleted Successfully"
            ],200);
        }else{
            return response()->json([
                "status" => false,
                "message"=>"you can't Delete post you don't own it Sorry"
            ],401);
        }

    }


}
