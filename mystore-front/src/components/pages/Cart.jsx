import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { BaseUrl } from '../../tools/api'

const Cart = ({products,color}) => {
    
  return (
    <Card className='col-4' border={color} style={{ width: '18rem',height:"400px"}}>
    <Card.Header className='bg-white'>
    {/* <FontAwesomeIcon onClick={()=>{
      if (products) {
        
      }
   
    }}
    icon={faXmark}  className='carticon' style={{color:'red'}}/>
   <NavLink to={`${products.id}`}><FontAwesomeIcon icon={faEdit}   className='carticon'/></NavLink>: */}
   <Card.Title>{products.name}</Card.Title>

    </Card.Header>
    <Card.Body>
  <Card.Img variant="top" src={`${BaseUrl}/${products.image}`} />
      <div  className='catProd'>
      <Card.Text>
     {products.categoryname}
      </Card.Text>
      <Card.Text>
       {`${products.price} $`} 
      </Card.Text>
      </div>
      <Card.Text className='cartdis' >
       {products.description}
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Cart