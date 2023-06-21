<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login() {
        $credentials = request(['email', 'password']);
        //prüft, ob Token gültig ist
        if (! $token = auth()->attempt($credentials)) {
            //Token ungültig
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        //Token gültig, Token zurückgeben
        return $this->respondWithToken($token);
    }

    //JWT-Token in JSON-Objekt, wird zurückgeschickt an Client
    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 600000
        ]);
    }

    //aktueller User wird zurückgegeben
    public function me() {
        return response()->json(auth()->user());
    }

    //Token ungültig bzw. zerstört
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    //Refresh und Gültigkeitsdauer wieder auf 0 setzen, Token ändert sich nicht
    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }
}
