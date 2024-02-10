<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Trait\HTTP_Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use HTTP_Request;
    public function login(Request $request){

        $validator=Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);
        if ($validator->fails())
        {
//            return response()->json([
//                'message'=>'validation error',
//                'error'=>$validator->errors()
//            ],401);
          return  $this->ErrorResponse('validation error',$validator->errors(),401);
        }

        if (Auth::attempt($request->only(['email', 'password']))) {

            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('token-name',[$user->role])->plainTextToken;
            $role= $user->getRoleNames();
//            return  response()->json([
//                'success'=>true,
//                'message'=>'User Logged In Successfully',
//                'data'=>$user,
//                'token'=>$token
//            ]);
          return  $this->SuccessResponse('User Logged In Successfully',$user,$token,200);
        }
        else{
//            return response()->json([
//                'erorr'=>'Email & Password does not match with our record'
//            ],401);
          return  $this->ErrorResponse(' error','Email & Password does not match with our record',401);

        }
    }
    public function logout(){
//        tokens
        \auth()->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=>'Your logout success'
        ],200);
    }
    public function StoreDetails(){
        $userCount=User::role('user')->count();
        $productCount=Product::count();
        $orderCount=Order::count();

        return response()->json([
           'data'=>[
            'userCount'=>$userCount,
           'ProductCount'=>$productCount,
            'OrderCount'=>$orderCount,]
      ],200);

//        $userCount = User::role('user')->count();
//        $productCount = Product::count();
//        $orderCount = Order::count();
//
//        $responseData = [
//            'user_count' =>[ $userCount],
//            'product_count' => $productCount,
//            'order_count' => $orderCount,
//        ];
//
//        return response()->json([
//            'message' => 'تم استرجاع الإحصائيات بنجاح',
//            'data' => $responseData,
//        ], 200);
    }
}
