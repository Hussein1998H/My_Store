<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    /**
     * @return List of Category
     *
     */
    public function  GetCategories(): JsonResponse
    {
        $categories = Category::all();

        return response()->json([
            'message' => 'Categroies has been retreived successfully',
            'data' => $categories,
        ], 200);
    }

    public function StoreCategory(Request $request){

        $validate=Validator::make($request->all(),[
            'name'=>'required',
            'desc'=>'required',
            'image'=>'required',
        ]);
        if ($validate->fails()){
            return response()->json([
                'Error'=>$validate->errors()
            ],400);
        }
        if ($request->file('image')){
            $img=$request->file('image')->getClientOriginalName();
            $fullname=date('Y_m_d_His')."_".$img;
//            $path=$request->file('image')->storeAs('images',$fullname,'images');
            $path=$request->file('image')->move('images',$fullname);

            $category=Category::create([
                'name'=>$request->name,
                'desc'=>$request->desc,
                'image'=>$path,
            ]);

            return response()->json([
                'success'=>' Category save successfully ',
                'data'=>$category
            ],200);
        }
    }

    public function show(string $id){
        $category=Category::find($id);

        if (!$category){
            return response()->json([
                'Error'=>'we Dont Found The Product',

            ],400);
        }
        return response()->json([
            'success'=>'we Found The Product',
            'data'=>$category
        ],200);
    }


    public function update(Request $request,string $id){

        $category=Category::find($id);

        $validate=Validator::make($request->all(),[
            'name'=>'nullable',
            'desc'=>'nullable',
            'image'=>'nullable',
        ]);
        if ($validate->fails()){
            return response()->json([
                'Error'=>$validate->errors()
            ],400);
        }
        if ($request->file('image')){

            unlink(public_path($category->image));

            $img=$request->file('image')->getClientOriginalName();
            $fullname=date('Y_m_d_His')."_".$img;
//            $path=$request->file('image')->storeAs('images',$fullname,'images');
            $path=$request->file('image')->move('images',$fullname);

            $category->update([
                'name'=>$request->name,
                'desc'=>$request->desc,
                'image'=>$path,
            ]);

            return response()->json([
                'success'=>' Category Update successfully ',
                'data'=>$category
            ],200);
        }

        else{

            $category->update([
                'name'=>$request->name,
                'desc'=>$request->desc,
            ]);

            return response()->json([
                'success'=>' Category save successfully ',
                'data'=>$category
            ],200);
        }


    }
    public function destroy(string $id){
        $category=Category::find($id);
        if ($category){
            unlink(public_path($category->image));
            $category->delete();
            return response()->json([
                'success'=>true,
                'message'=>'Category Delete Successfully'
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'Category Do Not Found'
            ],400);
        }

    }
}
