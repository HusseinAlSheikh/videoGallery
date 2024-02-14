<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
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
        $userId = Auth::user()->id;
        $userVideos = Video::where('user_id' , $userId)->get();
        return response()->json($userVideos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'url'   => 'required',
            'title' => 'required',
            'is_public' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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
        $imagePath = $request->file('image')->store('images', 'public');
        //------------
        $video = Video::create([
            'url'     => $request->url ,
            'title'   => $request->title ,
            'is_public'   => $request->is_public ,
            'image_path' => $imagePath,
            'user_id' => Auth::user()->id
        ]);
        return response()->json([
            'status'  => true,
            'message' => 'Video Created Successfully',
            'video'   => $video
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        return response()->json([
            'status'  => true,
            'video'   => $video
        ],200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVideoRequest $request, Video $video)
    {
        ///------------------
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
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
    }

    //--------------------------
    function getLatestPublicVideos(){
        $latestVideos = Video::where('is_public' , true)->latest()->get();
        return response()->json([
            'videos' => $latestVideos
        ]);
    }
    //--------------------------
}
