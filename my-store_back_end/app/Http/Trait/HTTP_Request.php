<?php

namespace App\Http\Trait;

trait HTTP_Request
{

    public function SuccessResponse($message,$data,$token=null,$code=null){
        if ($token==null){
            return response()->json([
                'success'=>$message,
                'data'=>$data
            ],$code);
        }
        return response()->json([
            'success'=>true,
            'message'=>$message,
            'data'=>$data,
            'token'=>$token,
        ],$code);
    }

    public function ErrorResponse($message,$error=null,$code=null){

        return response()->json([
            'success'=>false,
            'message'=>$message,
            'error'=>$error,
        ],$code);
    }


}
