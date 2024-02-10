import React from 'react'
import { Card } from 'react-bootstrap'
import { BaseUrl, EndPoint } from '../../Api/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons'
import "./Cart.scss"
import axios from 'axios'
import Cookies from 'universal-cookie'
import { NavLink } from 'react-router-dom'

const Cart = ({products,UpdateCount,color,category}) => {

    const cookie=new Cookies();
    const token=cookie.get('bearer')

   async function handelDelete(id) {
        try {

          if (products) {
            let res=await axios.delete(`${BaseUrl}/${EndPoint.deleteProduct}/${id}`,{
              headers:{
                  Authorization:`Bearer ${token}`
              }
          })
          if (res.status===200) {
            UpdateCount()
        }
          }
          if (category) {
            let res=await axios.delete(`${BaseUrl}/${EndPoint.deleteCategory}/${id}`,{
              headers:{
                  Authorization:`Bearer ${token}`
              }
          })
          if (res.status===200) {
            UpdateCount()
        }
          }
            
           
        } catch (error) {
            console.log(error);
        }
    }
  return (
    
    <Card border={color} style={{ width: '18rem',height:"380px"}}>
    <Card.Header>
    <FontAwesomeIcon onClick={()=>{
      if (products) {
        handelDelete(products.id)
      }
      if(category){
        handelDelete(category.id)

      }
    }}
    icon={faXmark}  className='carticon' style={{color:'red'}}/>
    {products?<NavLink to={`${products.id}`}><FontAwesomeIcon icon={faEdit}   className='carticon'/></NavLink>:
    <NavLink to={`${category.id}`}><FontAwesomeIcon icon={faEdit}   className='carticon'/></NavLink>}
    </Card.Header>
    <Card.Body>
    {products?<Card.Img variant="top" src={`${BaseUrl}/${products.image}`} />:<Card.Img variant="top" src={`${BaseUrl}/${category.image}`} />}
      {products?<Card.Title>{products.name}</Card.Title>:<Card.Title>{category.name}</Card.Title>}
      <div  className='catProd'>
      <Card.Text>
       {products&&products.categoryname}
      </Card.Text>
      <Card.Text>
       {products&&`${products.price} $`} 
      </Card.Text>
      </div>
      <Card.Text className='cartdis' >
       {products?products.description:category.desc}
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Cart