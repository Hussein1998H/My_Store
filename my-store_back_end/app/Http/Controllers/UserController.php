<?php

namespace App\Http\Controllers;

use App\Http\Trait\HTTP_Request;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use HTTP_Request;


    public function profile(){
        $user=\auth()->user();
        $user->getRoleNames();
        return  $this->SuccessResponse( __('Success'),$user, null,200);

    }
    public function index(){

//            $users=User::whereHas('roles',function ($q){
//                $q->where('name','user');
//            })->get();
            $users = User::role('user')->get();
//           $userCount= $users->count();

            return $this->SuccessResponse('success',$users,null,200);


    }

    public function store(Request $request)
        // : RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

//        Auth::login($user); // to be cancelled

        // check if API call
        if ($request->wantsJson()) {
//            // Revoke all tokens...
//            $user->tokens()->delete();

            // create new token
//            $token = $request->user()->createToken('register_token')->plainTextToken;
            $user->assignRole('user');
            $role= $user->getRoleNames();

            return  $this->SuccessResponse( __('Success'),$user, null,200);
        }
    }


    public function update(Request $request,string $id){
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'password' => ['nullable'],
        ]);

        $user=User::find($id);
        if ($user){
            if ($request->password){
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                return  $this->SuccessResponse( __('Success Update'),$user, null,200);

            }
            else{
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                ]);
                return  $this->SuccessResponse( __('Success Update'),$user, null,200);

            }
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'user Do Not Found'
            ],400);
        }
    }
    public function show(string $id){
        $user=User::find($id);
        if ($user){
            return  $this->SuccessResponse( __('Success '),$user, null,200);

        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'user Do Not Found'
            ],400);
        }
    }
    public function destroy(string $id){

        $user=User::find($id);
        if ($user){
            $user->delete();

            return response()->json([
                'success'=>true,
                'message'=>'user Delete Successfully'
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'user Do Not Found'
            ],400);
        }
    }
}
