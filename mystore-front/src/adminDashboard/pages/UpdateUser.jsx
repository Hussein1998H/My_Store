import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { BaseUrl, EndPoint } from '../../Api/Api';
import "../Dashbiard.scss"
import "./scss/AddUser.scss"
import SAlert from '../components/SAlert';
import { toggel } from '../../Context/ToggelConstext';

const UpdateUser = () => {
    
        const[form,setForm]=useState({
          name:'',
          email:'',
          password:'',
        });
        const {isToggled,ToggelUpdate}=useContext(toggel)
        let user_id=window.location.pathname.split('/').slice(-1)[0];

        useEffect(()=>{
            async  function profile(){
            await axios.get(`${BaseUrl}/${EndPoint.showUser}/${user_id}`,{
                  headers:{Authorization:`Bearer ${token}`}
              })
              .then(response=>setForm({
                name:response.data.data.name,
                email:response.data.data.email

              })
            )
              }
             
      
              profile()
          },[])

        const[accept,SetAccept]=useState(false);
        const[show,SetShow]=useState(false);
        const cookie=new Cookies();
        const token =cookie.get('bearer')
        let nav=useNavigate()
        function handleChange(e) {
        
          setForm({...form,[e.target.name]:e.target.value})
        }
        console.log(form);
         async function Submit(e){
            e.preventDefault()
            SetAccept(true)
        
            try {
              let res=await axios.post(`${BaseUrl}/${EndPoint.updateUser}/${user_id}?_method=PUT`,form,{
                  headers:{
                      Authorization:`Bearer ${token}`
                  }
              });
              if (res.status===200) {
                  SetShow(true)
              //   nav('/')
              console.log(res.data);
         
              setTimeout(()=>{
                  SetShow(false)
                  nav('/admin/dashboard/all-user')
              },1000)
              //init data
            //   setForm({
            //       name:'',
            //       email:'',
            //       password:''
            //   })
              }
            } catch (error) {
              console.log(error);
            }
        
          }
  return (
    <div className={'containt layout'}  style={isToggled===true?{width:'100%'}:null}
>
    {show&&<SAlert title={'User ADD '} body={'User Update Successfully'} color='primary'/>}
    
  <div className={'formContainer'}>
  <Form className={'form'} onSubmit={Submit}>
    <h1 className={'formTitle'}>Update User</h1>


    <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name"
    name='name'
     value={form.name}
     onChange={handleChange}/>
    <Form.Text className="text-muted">
      {accept&&form.name===''?'please Enter User Name':null}
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"
    name='email'
     value={form.email}
     onChange={handleChange}/>
    <Form.Text className="text-muted">
      {accept&&form.email===''?'please Enter Email':null}
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"
    name='password'
    value={form.password}
    onChange={handleChange} />
    <Form.Text className="text-muted">
    {accept&&form.email===''?'please Enter Password':null}
    </Form.Text>
  </Form.Group>

  {/* <Form.Group className="mb-3" controlId="formBasicPasswordConf">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"
    name='password_confirmation'
    value={form.password_confirmation}
    onChange={handleChange} />
    <Form.Text className="text-muted">
    {accept&&form.password_confirmation===''?'please Enter password_confirmation':null}
    </Form.Text>
  </Form.Group> */}

  <Button variant="primary" type="submit" style={{width:'50%'}}>
    Update User
  </Button>
</Form>
  </div>
</div>
  )
}

export default UpdateUser