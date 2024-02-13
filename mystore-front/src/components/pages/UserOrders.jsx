import React, { useEffect, useState } from 'react'
import "./UserOrder.scss"
import Cookies from 'universal-cookie';
import { BaseUrl, EndPoint } from '../../tools/api';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserOrders = () => {
    const[orders,setorders]=useState([])
//   const[show,SetShow]=useState(false);

  const cookie=new Cookies();
  const token=cookie.get('bearer');

 async function GetOrders(){
 try {
  let res=await axios.get(`${BaseUrl}/${EndPoint.userOrder}`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
      
  })
  .then(response=>{
    setorders(response.data.data)
    console.log(response.data.data)})
 } catch (error) {
  console.log(error);
 }
  }

  useEffect(()=>{
    GetOrders()
  },[])

  let tr=orders.map((el,index)=>{
      return <tr key={index}>
      <td>{index+1}</td>
      <td>{el.total}</td>
      <td>{el.date}</td>
      <td> 
        <NavLink to={`${el.id}`}><Button variant="primary" className='mx-3 mt-1'>show</Button></NavLink>
        {/* <Button  variant="primary"><NavLink to={`${el.id}`}  className='mx-3 mt-1' >View</NavLink></Button> */}

          
          {/* <Button variant="danger" className=' mt-1' onClick={()=>{handelDelete(el.id)}}>Delete</Button> */}
      </td>
    </tr>
     })
  return (
orders.length===0 || orders===undefined?<h1> No Order Yet !</h1>:
    <div className='content'>
    {/* {show&&<SAlert style={{justifyContent:'center'}} title={'Delete Order '} body={'Order Delete Successfully'} color='danger'/>} */}

 <Table striped bordered hover  className='tableUser' >
 <thead>
   <tr>
     <th>#</th>
     <th>Total</th>
     <th>Date</th>
     <th>Action</th>
   </tr>
 </thead>
 <tbody>
   {tr===null?<div> No Orser Yet</div>:tr}
 </tbody>
</Table>  

   
        
        </div>
  )
}

export default UserOrders