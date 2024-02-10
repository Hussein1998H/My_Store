import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthStyle from './Auth.module.scss'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { BaseUrl, EndPoint } from '../../../tools/api';
import SAlert from '../../../adminDashboard/components/SAlert';

const Rigister = () => {
  const[form,setForm]=useState({
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  });
  const[accept,SetAccept]=useState(false);
  const[show,SetShow]=useState(false);
const[errorMsg,setErrorMsg]=useState('');
  const cookie=new Cookies();
  let products=[];
  let nav=useNavigate()
  function handleChange(e) {
  
    setForm({...form,[e.target.name]:e.target.value})
  }
  console.log(form);
   async function Submit(e){
      e.preventDefault()
      SetAccept(true)
  
      try {
        let res=await axios.post(`${BaseUrl}/${EndPoint.register}`,form);
        if (res.status===200) {
          cookie.set('bearer',res.data.token)
          cookie.set('products',products)

          nav('/')
        }
      } catch (error) {
        SetShow(true)
        setErrorMsg(error.response.data.message)
        setTimeout(()=>{
          SetShow(false)
        },2000)
      }
  
    }
  return (
    <div className={AuthStyle.containt}>
                {show&&<SAlert style={{justifyContent:'center'}} title={' Error '} body={errorMsg} color='danger'/>}

      <div className={AuthStyle.formContainer}>
      <Form className={AuthStyle.form} onSubmit={Submit}>
        <h1 className={AuthStyle.formTitle}>Rigister</h1>


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

      <Form.Group className="mb-3" controlId="formBasicPasswordConf">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        name='password_confirmation'
        value={form.password_confirmation}
        onChange={handleChange} />
        <Form.Text className="text-muted">
        {accept&&form.password_confirmation===''?'please Enter password_confirmation':null}
        </Form.Text>
      </Form.Group>
      <Form.Group>
      <NavLink className={AuthStyle.item} to={'/login'}>I Have Account ? Login</NavLink>

      </Form.Group>
      <Button variant="primary" type="submit" style={{width:'50%'}}>
        Rigister
      </Button>
    </Form>
      </div>
    </div>
  )
}

export default Rigister