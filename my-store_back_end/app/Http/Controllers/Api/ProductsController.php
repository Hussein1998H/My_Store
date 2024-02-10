<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{

    /**
     * @param name
     * @param category
     *
     * @return Array<Product>
     */
    public function GetProducts(Request $request): JsonResponse
    {
//        // init request parameters
//        $name = $request->name;
//        $category = $request->category;
//
//        $proudcts = Product::all();
//
//        // filter by name
//        if (!empty($name)) {
//            $proudcts = $proudcts->where('name', $name);
//
//        }
//
//        // filter by category
//        if (!empty($category)) {
//            $proudcts = Product::whereHas('categoryObject',function ($q)use ($category){
//                $q->where('name',$category);
//            })->get();
//
//        }
//
//        return response()->json([
//            'message' => 'products has been retreived successfully',
//            'data' => $proudcts,
//        ], 200);
        // init request parameters
        $name = $request->name;
        $category = $request->category;

        $products = Product::query();

        // filter by name
        if (!empty($name)) {
            $products->where('name', $name);
        }

        // filter by category
        if (!empty($category)) {
            $products->whereHas('categoryObject', function ($q) use ($category) {
                $q->where('name', $category);
            });
        }

        // get the results as a collection
        $products = $products->get();

        return response()->json([
            'message' => 'products has been retrieved successfully',
            'data' => $products,
        ], 200);
    }


    public function show(string $id){

        $product=Product::find($id);

        if (!$product){
            return response()->json([
                'Error'=>'we Dont Found The Product',

            ],400);
        }
        return response()->json([
            'success'=>'we Found The Product',
            'data'=>$product
        ],200);
    }

    public function showProducts(Request $request){

        $products=Product::whereIn('id',$request->ids)->get();

        if (!$products){
            return response()->json([
                'Error'=>'we Dont Found The Product',

            ],400);
        }
        return response()->json([
            'success'=>'The Product',
            'data'=>$products
        ],200);
    }
    public function store(Request $request){

        $validate=Validator::make($request->all(),[
            'name'=>'required',
            'description'=>'required',
            'price'=>'required',
            'image'=>'required',
            'category'=>'required',
        ]);
        if ($validate->fails()){
            return response()->json([
                'Error'=>$validate->errors()
            ],400);
        }
        $category=Category::where('name',$request->category)->first();
        if ($request->file('image')){
            $img=$request->file('image')->getClientOriginalName();
            $fullname=date('Y_m_d_His')."_".$img;
//            $path=$request->file('image')->storeAs('images',$fullname,'images');
            $path=$request->file('image')->move('images',$fullname);

            $product=Product::create([
                'name'=>$request->name,
                'description'=>$request->description,
                'price'=>$request->price,
                'image'=>$path,
                'category'=>$category->id,
            ]);

            return response()->json([
                'success'=>' Product save successfully ',
                'data'=>$product
            ],200);
        }
    }

    public function update(Request $request,string $id){

        $product=Product::find($id);

        $validate=Validator::make($request->all(),[
            'name'=>'nullable',
            'description'=>'nullable',
            'price'=>'nullable',
            'image'=>'nullable',
            'category'=>'nullable',
        ]);
        if ($validate->fails()){
            return response()->json([
                'Error'=>$validate->errors()
            ],400);
        }
        $category=Category::where('name',$request->category)->first();
        if ($request->file('image')){

            unlink(public_path($product->image));

            $img=$request->file('image')->getClientOriginalName();
            $fullname=date('Y_m_d_His')."_".$img;
//            $path=$request->file('image')->storeAs('images',$fullname,'images');
            $path=$request->file('image')->move('images',$fullname);

            $product->update([
                'name'=>$request->name,
                'description'=>$request->description,
                'price'=>$request->price,
                'image'=>$path,
                'category'=>$category->id,
            ]);

            return response()->json([
                'success'=>' Product save successfully ',
                'data'=>$product
            ],200);
        }

        else{

            $product->update([
                'name'=>$request->name,
                'description'=>$request->description,
                'price'=>$request->price,
                'category'=>$category->id,
            ]);

            return response()->json([
                'success'=>' Product save successfully ',
                'data'=>$product
            ],200);
        }


    }

    public function destroy(string $id){
        $product=Product::find($id);

        if ($product){
            unlink(public_path($product->image));
            $product->delete();
            return response()->json([
                'success'=>true,
                'message'=>'Product Delete Successfully'
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'Product Do Not Found'
            ],400);
        }

    }
}
