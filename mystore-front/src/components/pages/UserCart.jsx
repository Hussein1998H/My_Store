import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { BaseUrl, EndPoint } from '../../tools/api';
import Cart from './Cart';
import { Button } from 'react-bootstrap';
import SAlert from '../../adminDashboard/components/SAlert';
import { useNavigate } from 'react-router-dom';

const UserCart = () => {
    const[products,setProducts]=useState([])
    const[show,SetShow]=useState(false);
    let cookie=new Cookies();
    let token=cookie.get('bearer')
    let prod=cookie.get('products')
    const nav=useNavigate();
    console.log(prod); 

    let ids=[];
    prod.map((el)=>{
        if (el!==undefined)ids.push(parseInt(el.id))
    })
console.log(ids);

async function getProd() {
    let res =await axios.post(`${BaseUrl}/${EndPoint.cartProduct}`,{
        ids:ids
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        setProducts(response.data.data);
        console.log(response.data.data);
    })
}

async function SaveCart(e) {
    e.preventDefault();
    try {
        
        let res= await axios.post(`${BaseUrl}/${EndPoint.createOrder}`,{
            products:prod
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        if (res.status===200) {
            
            SetShow(true)
            setTimeout(()=>{
              SetShow(false)
              cookie.set('products',[])
              nav('/')
            },1000)
        }
    } catch (error) {
        console.log(error);
    }
}
useEffect(()=>{
getProd()
},[])
  return (
    <>
<div style={{width:'100vw',textAlign:'center'}}>
{show&&<SAlert style={{justifyContent:'center'}} title={' Order '} body={'Order ADD Successfully'} color='success'/>}

</div>
    <div className='pt-4 pb-4'>
    <Button onClick={SaveCart} variant="outline-warning" className='mx-3 my-3'>Save</Button>
    <Button onClick={() => {
        cookie.set('products',[])
              nav('/')
    }} variant="outline-danger" className='mx-3 my-3'>Cansel</Button>
    </div>
    <div className=" row " style={{width:'100vw',gap:'50px',padding:'15px'}}>
        {products!==undefined||products!==null?products.map((el,index)=>{
            return <Cart key={index} products={el} color={'warning'}/>
        }):<h1>
            No Product yet </h1>}
    </div>
    </>
  )
}

export default UserCart