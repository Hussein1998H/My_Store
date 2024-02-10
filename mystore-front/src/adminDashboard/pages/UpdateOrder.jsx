import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { BaseUrl, EndPoint } from '../../Api/Api'
import SAlert from '../components/SAlert'
import { Button, Table } from 'react-bootstrap'

const UpdateOrder = () => {
    const [order,setOrder]=useState([])
    const [product,setproduct]=useState([])
    const [count,setCount]=useState(0);
    const[show,SetShow]=useState(false);
    const [updateProd,setUpdateProd]=useState([])
    const cookie =new Cookies()
    const token=cookie.get('bearer')
    const nav=useNavigate()
    let order_id=window.location.pathname.split('/').slice(-1)[0];
    let user_id=order.user_id

    function handelUpdate(id,qty) {
      
      setUpdateProd([...updateProd,{
        id:id,
        qty:qty
      }])
    }

   async function UpdateOrder(order_id,user_id,products) {
      try {
        let res=await axios.put(`${BaseUrl}/${EndPoint.updateOrder}`,{
          order:order_id,
          user_id:user_id,
          products:products
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        if (res.status===200) {
          SetShow(true)
          setTimeout(()=>{
            SetShow(false)
            setCount(prev=>prev+1)
          },1000)
        }
      } catch (error) {
        console.log(error);
      }
    }


    async function GetOrder() {
        let res=await axios.get(`${BaseUrl}/${EndPoint.orderDetail}/${order_id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            setOrder(response.data.data)
            setproduct(response.data.data.products)
            // console.log(response.data.data);
        })
    }
    function handelDelete(id) {
        
    }
    useEffect(()=>{
        GetOrder();

    },[count])
    // let prod=order.products;
    let tr=product.map((el,index)=>{
        return <tr key={index}>
        <td>{index+1}</td>
        <td>{el.product_object.name}</td>
        <td>{el.product_object.categoryname}</td>
        <td>{el.product_object.price}</td>
        <td>{el.qty}</td>
        <td> <input type="number" name="qty" id="qty"  placeholder={el.qty}  onChange={(e)=>{handelUpdate(el.product,e.target.value)}}/></td>
        <td> 

          {/* <NavLink to={`${el.id}`}><Button variant="primary" className='mx-3 mt-1'>Edite</Button></NavLink> */}
         <Button variant="success" className='mx-3 mt-1' onClick={()=>{UpdateOrder(order_id,user_id,updateProd)}}>Save</Button>
          
            <Button variant="danger" className=' mt-1' onClick={()=>{UpdateOrder(order_id,user_id,[{id:el.product,qty:-1}])}}>Delete</Button>
        </td>
      </tr>
    })

    // console.log(order.products);
    console.log(updateProd);
    console.log(user_id);

  return (
    <div className='layout'>
    {show&&<SAlert style={{justifyContent:'center'}} title={' Order '} body={'Order update Successfully'} color='primary'/>}

    <Table striped bordered hover  className='tableUser' >
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Category</th>
          <th>price</th>
          <th>Quantity</th>
          <th>New Quantity</th>
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

export default UpdateOrder