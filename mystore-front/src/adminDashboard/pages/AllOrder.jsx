import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import "../Dashbiard.scss"
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../Api/Api';
import Cookies from 'universal-cookie';
import "./scss/AddUser.scss"
import { Button } from 'react-bootstrap';
import SAlert from '../components/SAlert';
import { NavLink } from 'react-router-dom';
import { toggel } from '../../Context/ToggelConstext';

const AllOrder = () => {
  const[orders,setorders]=useState([])
  const[show,SetShow]=useState(false);
  const {isToggled,ToggelUpdate}=useContext(toggel)

  const cookie=new Cookies();
  const token=cookie.get('bearer');

 async function GetUsers(){
 try {
  let res=await axios.get(`${BaseUrl}/${EndPoint.allOrders}`,{
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

 async function handelDelete(id) {
    let res=await axios.delete(`${BaseUrl}/${EndPoint.deleteOrder}/${id}`,{
      headers: {Authorization : `Bearer ${token}`},
    })
    if (res.status===200) {
      SetShow(true)
      setTimeout(()=>{
        SetShow(false)
      },1000)
    }
  }
  useEffect(()=>{
      GetUsers()
  },[show])

  let tr=orders.map((el,index)=>{
      return <tr key={index}>
      <td>{index+1}</td>
      <td>{el.user.name}</td>
      <td>{el.user.email}</td>
      <td>{el.total}</td>
      <td>{el.date}</td>
      <td> 
        <NavLink to={`${el.id}`}><Button variant="primary" className='mx-3 mt-1'>Edite</Button></NavLink>
          
          <Button variant="danger" className=' mt-1' onClick={()=>{handelDelete(el.id)}}>Delete</Button>
      </td>
    </tr>
  })
  
  return (
    <div className='layout'style={isToggled===true?{width:'100%'}:null}>
    {show&&<SAlert style={{justifyContent:'center'}} title={'Delete Order '} body={'Order Delete Successfully'} color='danger'/>}

    <Table striped bordered hover  className='tableUser' >
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Email</th>
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

export default AllOrder