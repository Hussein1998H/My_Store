import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthStyle from './Auth.module.scss'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { BaseUrl, EndPoint } from '../../../tools/api';
import SAlert from '../../../adminDashboard/components/SAlert';
const Login = () => {
const[form,setForm]=useState({
  email:'',
  password:''
});
const[accept,SetAccept]=useState(false);
const[show,SetShow]=useState(false);
const[errorMsg,setErrorMsg]=useState('');
const cookie=new Cookies();
let nav=useNavigate()
let products=[];
function handleChange(e) {

  setForm({...form,[e.target.name]:e.target.value})
}
console.log(form);
 async function Submit(e){
    e.preventDefault()
    SetAccept(true)

    try {
      let res=await axios.post(`${BaseUrl}/${EndPoint.login}`,form);
      if (res.status===200) {
        cookie.set('bearer',res.data.token)
        cookie.set('products',products)
        const role=res.data.data.roles[0].name

        if (role==='admin'){
          nav('/admin/dashboard')
        }
       else if (role==='user'){
          nav('/')
        }
        
        
      }
      // console.log(res.data.token);
    } catch (error) {
      console.log(error);
      SetShow(true)
      setErrorMsg(error.response.data.message)
      setTimeout(()=>{
        SetShow(false)
      },1500)
    }

  }


  // async function Submit1(e){
  //   e.preventDefault()
  //   SetAccept(true)

  //   try {
  //     let res=await fetch(`${BaseUrl}/${EndPoint.login}`,form);
  //     if (res.status===200) {
  //       cookie.set('bearer',res.data.token)
  //       const role=res.data.data.roles[0].name

  //       if (role==='admin'){
  //         nav('/dashboard')
  //       }
  //      else if (role==='user'){
  //         nav('/')
  //       }
        
        
  //     }
  //     // console.log(res.data.token);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  return (
    <div className={AuthStyle.containt}>
          {show&&<SAlert style={{justifyContent:'center'}} title={' Error '} body={errorMsg} color='danger'/>}

      <div className={AuthStyle.formContainer}>
      <Form className={AuthStyle.form} onSubmit={Submit}>
        <h1 className={AuthStyle.formTitle}>Login</h1>
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
      <Form.Group>
      <NavLink className={AuthStyle.item} to={'/register'}>Dont't Have Account ? Rigister</NavLink>

      </Form.Group>
      <Button variant="primary" type="submit" style={{width:'50%'}}>
        Login
      </Button>
    </Form>
      </div>
    </div>
  )
}

export default Login