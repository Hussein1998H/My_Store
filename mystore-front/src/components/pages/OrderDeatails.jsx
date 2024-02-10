import React, { useEffect, useState } from 'react'
import "./UserOrder.scss"
import Cookies from 'universal-cookie';
import { BaseUrl, EndPoint } from '../../tools/api';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const OrderDeatails = () => {
    const[orders,setorders]=useState([])
    const[products,setProducts]=useState([])
//   const[show,SetShow]=useState(false);

  const cookie=new Cookies();
  const token=cookie.get('bearer');
  let order_id=window.location.pathname.split('/').slice(-1)[0];

 async function GetOrders(){
 try {
  let res=await axios.get(`${BaseUrl}/${EndPoint.userOrderDetails}/${order_id}`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
      
  })
  .then(response=>{
    setorders(response.data.data)
    setProducts(response.data.data.products)
    console.log(response.data.data)
    console.log(response.data.data.products)
})
 } catch (error) {
  console.log(error);
 }
  }

  useEffect(()=>{
    GetOrders()
  },[])

  let tr=products.map((el,index)=>{
    return <tr key={index}>
    <td>{index+1}</td>
    <td>{el.product_object.name}</td>
    <td>{el.product_object.categoryname}</td>
    <td>{el.product_object.price}</td>
    <td>{el.qty}</td>
  </tr>
})
  return (
    <div className='content'>
    {/* {show&&<SAlert style={{justifyContent:'center'}} title={'Delete Order '} body={'Order Delete Successfully'} color='danger'/>} */}

    <Table striped bordered hover  className='tableUser' >
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Category</th>
          <th>price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {tr===null?<div> No Orser Yet</div>:tr}
      </tbody>
    </Table>  
        
        </div>
  )
}

export default OrderDeatails