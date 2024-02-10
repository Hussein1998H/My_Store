import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BaseUrl, EndPoint } from "../../../tools/api";
import Cookies from "universal-cookie";
import LoadingScreen from "../../shared/LoadingScreen";

export default function RequierAuth(){
    const [user,SetUser]=useState("");
    const nav=useNavigate();
    const cookie=new Cookies();
    const token=cookie.get('bearer');
    useEffect(()=>{
      async  function profile(){
      await axios.get(`${BaseUrl}/${EndPoint.profile}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        .then(response=>SetUser(response.data.data)
      )
        .catch(()=>nav('/',{replace:true}))
        }
       

        profile()
    },[])
    return(
   
        token?(
            user===""?(
            <LoadingScreen/>
            ):(
                <Outlet/>
            ) 
            )
            :
            (<Navigate to={'/'} replace={true}/>)

    );
}