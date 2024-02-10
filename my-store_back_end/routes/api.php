<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\OrdersController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!

sanctum - passport
|
*/

// not auth requests
Route::middleware('guest')->group(function () {
    // 1) Register
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::post('login',[AuthController::class,'login']);
//
//    // 2) Login
//    Route::put('login', [AuthenticatedSessionController::class, 'store']);

    // 3) Get Products
    Route::get('products', [ProductsController::class, 'GetProducts']);
    Route::get('products-details/{id}', [ProductsController::class, 'show']);

    // 4) Get Categories
    Route::get('categories', [CategoryController::class, 'GetCategories']);
});

// auth requests
Route::middleware('auth:sanctum')->group(function () {
    // 1) Create orders
    Route::post('orders', [OrdersController::class, 'store']);

    // 2) Get orders
    Route::get('orders', [OrdersController::class, 'index']);

    // 3) Modify/Update Order
    Route::put('orders/{id}', [OrdersController::class, 'update']);

    Route::get('order-details/{id}', [OrdersController::class, 'show']);
    Route::post('cart-contant', [ProductsController::class, 'showProducts']);


    // 5) Get User API Requests
    Route::get('user', function (Request $request) {
        return $request->user();
    });




    // 5) Logout User
    Route::put('logout', [AuthenticatedSessionController::class, 'logout']);


    //profile
    Route::get('profile',[UserController::class,'profile']);

    Route::group(['middleware' => ['role:admin']], function () {
        //admin
        Route::prefix('admin')->group(function () {
        //user
        Route::get('get-users',[UserController::class,'index']);
        Route::post('store-user',[UserController::class,'store']);
        Route::delete('delete-user/{id}',[UserController::class,'destroy']);
        Route::put('update-user/{id}',[UserController::class,'update']);
        Route::get('show-user/{id}',[UserController::class,'show']);

        //category
        Route::post('StoreCategory', [CategoryController::class, 'StoreCategory']);
        Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
        Route::get('category-details/{id}', [CategoryController::class, 'show']);
        Route::put('update-category/{id}', [CategoryController::class, 'update']);


        //product
        Route::post('products', [ProductsController::class, 'store']);
        Route::put('update-product/{id}', [ProductsController::class, 'update']);
        Route::delete('delete-product/{id}', [ProductsController::class, 'destroy']);


        //orders
            Route::get('getOrders', [OrdersController::class, 'getOrders']);
            Route::delete('delete-Orders/{id}', [OrdersController::class, 'destroy']);
            Route::put('update-Order', [OrdersController::class, 'adminUpdate']);
            Route::put('test', [OrdersController::class, 'test']);

            //StoreDetails
        Route::get('StoreDetails',[AuthController::class,'StoreDetails']);
    });

    });


});


