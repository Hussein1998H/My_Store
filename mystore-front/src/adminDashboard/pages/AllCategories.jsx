import React, { useContext, useEffect, useState } from 'react'
import SAlert from '../components/SAlert'
import Cart from '../components/Cart'
import "../Dashbiard.scss"
import Cookies from 'universal-cookie';
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../Api/Api';
import { toggel } from '../../Context/ToggelConstext';

const AllCategories = () => {
    const[categories,setCategories]=useState([]);
      const[show,SetShow]=useState(false);
      const {isToggled,ToggelUpdate}=useContext(toggel)


    const[count,setCount]=useState(0);
    const cookie=new Cookies();
    const token =cookie.get('bearer')

     function UpdateCount() {
        setCount(prev=>prev+1)
        SetShow(true)
        
     }
   async function GetCattegories() {
    let res= await axios.get(`${BaseUrl}/${EndPoint.getCategory}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>setCategories(response.data.data))
    }

    useEffect(()=>{
        GetCattegories()
        setTimeout(()=>{
            SetShow(false)
        },1000)
    },[count])
   
  return (
    <div className=' content layout'  style={isToggled===true?{width:'100%'}:null}>
         {show&&<SAlert style={{justifyContent:'center'}} title={'Delete Product '} body={'Category Delete Successfully'} color='danger'/>}

        {
            categories.map((el,index)=>{return <Cart key={index} category={el} UpdateCount={UpdateCount} color={'primary'}/>})
        }
         
      
    </div>
  )
}

export default AllCategories