<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Method for handling user login
    public function login(Request $request)
    {
        // Get the email and password from the request
        $credentials = $request->only(['email', 'password']);

        // Attempt to authenticate the user with the provided credentials
        if (Auth::attempt($credentials)) {
            // If authentication succeeds, get the authenticated user
            $user = \Auth::user();

            // Generate an access token for the user
            $token = $user->createToken('MyApp')->accessToken;
            // return response()->json([
            //     'jamet' => $credentials
            // ]);

            // dd($token);

            // Return a JSON response with the user and token
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        // If authentication fails, return an "Unauthenticated" error response with a 401 status code
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    // Method for handling user logout
    public function logout(Request $request)
    {
        // Revoke and delete the user's access token
        $request->user()->token()->revoke();
        $request->user()->token()->delete();

        // Return a JSON response indicating successful logout
        return response()->json(['message' => 'Successfully Logged Out!']);
    }
}
