import React, { useEffect, useState } from 'react'
import Cart from '../components/Cart'
import "../Dashbiard.scss"
import "./scss/Product.scss"
import axios from 'axios'
import { BaseUrl, EndPoint } from '../../Api/Api'
import Cookies from 'universal-cookie'
import SAlert from '../components/SAlert'
const AllProducts = () => {
    const[products,setProducts]=useState([]);
      const[show,SetShow]=useState(false);

    const[count,setCount]=useState(0);
    const cookie=new Cookies();
    const token =cookie.get('bearer')

     function UpdateCount() {
        setCount(prev=>prev+1)
        SetShow(true)
        
     }
   async function GetProducts() {
    let res= await axios.get(`${BaseUrl}/${EndPoint.products}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>setProducts(response.data.data))
    }

    useEffect(()=>{
        GetProducts()
        setTimeout(()=>{
            SetShow(false)
        },1000)
    },[count])
  return (
    <div className=' content layout' >
         {show&&<SAlert style={{justifyContent:'center'}} title={'Delete Product '} body={'Product Delete Successfully'} color='danger'/>}

        {
            products.map((el,index)=>{return <Cart key={index} products={el} UpdateCount={UpdateCount} color={'warning'}/>})
        }
         
      
    </div>
  )
}

export default AllProducts