<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Trait\HTTP_Request;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    use HTTP_Request;
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    // : RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user); // to be cancelled

        // check if API call
        if ($request->wantsJson()) {
            // Revoke all tokens...
            $user->tokens()->delete();

            // create new token
            $token = $request->user()->createToken('register_token')->plainTextToken;

//            $role=Role::where('name','user')->first();
            $user->assignRole('user');
            $role= $user->getRoleNames();
//            return response()->json([
//                'data' => $user,
//                'token' => $token,
//                'message' => __('Success'),
//            ], 200);
            return  $this->SuccessResponse( __('Success'),$user, $token,200);
        }



        return redirect(RouteServiceProvider::HOME);
    }
}
