<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $userId = Auth::user()->id;
            $userVideos = Video::where('user_id' , $userId)->get();
            return response()->json($userVideos);
        }catch (\Throwable $e ){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'url' => 'required',
                'title' => 'required',
                'is_public' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            //-------
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validate error',
                    'errors' => $validator->errors()
                ], 401);
            }
            //------------
            $imagePath = $request->file('image')->store('images', 'public');
            //------------
            $video = Video::create([
                'url' => $request->url,
                'title' => $request->title,
                'is_public' => $request->is_public,
                'image_path' => $imagePath,
                'user_id' => Auth::user()->id
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Video Created Successfully',
                'video' => $video
            ], 200);
        }catch (\Throwable $e ){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        try{
            return response()->json([
                'status'  => true,
                'video'   => $video
            ],200);
        }catch (\Throwable $e ){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        try{
            if (Auth::user()->id !== $video->user_id){
                return response()->json([
                    'status'  => false,
                    'message' => 'un authoraize action ',
                ],401);
            }
            ///------------------
            $validator = Validator::make($request->all(),[
                'url'   => 'required',
                'title' => 'required',
                'is_public' => 'required',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            //-------
            if($validator->fails()){
                return response()->json([
                    'status'  => false,
                    'message' => 'validate error',
                    'errors'  => $validator->errors()
                ],401);
            }
            //------------
            if ($request->hasFile('image')){
                $imagePath = $request->file('image')->store('images', 'public');
                $video-> image_path = $imagePath ;
            }
            //------------
            $video-> url = $request->url ;
            $video-> title = $request->title ;
            $video-> is_public = $request->is_public ;
            $video = $video->save();
            return response()->json([
                'status'  => true,
                'message' => 'Video Updated Successfully',
                'video'   => $video
            ],200);
        }catch (\Throwable $e ){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        try{
            if (Auth::user()->id !== $video->user_id){
                return response()->json([
                    'status'  => false,
                    'message' => 'un authoraize action ',
                ],401);
            }
            $video->delete();
            return response()->json([
                'status'  => true,
                'message' => 'Video Deleted Successfully',
            ],200);
        }catch (\Throwable $e ){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }

    //--------------------------
    function getLatestPublicVideos(){
        try{
            $latestVideos = Video::where('is_public' , true)->latest()->get();
            return response()->json([
                'videos' => $latestVideos
            ]);
        }catch (\Throwable $e ){
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ],500);
        }
    }
    //--------------------------
}
