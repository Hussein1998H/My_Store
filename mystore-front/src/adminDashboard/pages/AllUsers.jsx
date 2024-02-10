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

const AllUsers = () => {

    const[users,setUsers]=useState([])
    const[show,SetShow]=useState(false);
    const {isToggled,ToggelUpdate}=useContext(toggel)
    const cookie=new Cookies();
    const token=cookie.get('bearer');

   async function GetUsers(){
   try {
    let res=await axios.get(`${BaseUrl}/${EndPoint.allUsers}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
        
    })
    .then(response=>setUsers(response.data.data))
   } catch (error) {
    console.log(error);
   }
    }

   async function handelDelete(id) {
      let res=await axios.delete(`${BaseUrl}/${EndPoint.deleteUser}/${id}`,{
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

    let tr=users.map((el,index)=>{
        return <tr key={index}>
        <td>{index+1}</td>
        <td>{el.name}</td>
        <td>{el.email}</td>
        <td> 
          <NavLink to={`${el.id}`}><Button variant="primary" className='mx-3 mt-1'>Edite</Button></NavLink>
            
            <Button variant="danger" className=' mt-1' onClick={()=>{handelDelete(el.id)}}>Delete</Button>
        </td>
      </tr>
    })
  return (
    <div className='layout'    style={isToggled===true?{width:'100%'}:null}
>
    {show&&<SAlert style={{justifyContent:'center'}} title={'Delete User '} body={'User Delete Successfully'} color='danger'/>}

    <Table striped bordered hover  className='tableUser' >
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tr===null?<div> No User Yet</div>:tr}
      </tbody>
    </Table>  
    </div>
  )
}

export default AllUsers