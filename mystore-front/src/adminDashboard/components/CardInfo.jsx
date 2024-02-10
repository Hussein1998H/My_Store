import React from 'react'
import { Card } from 'react-bootstrap'
import "./CardInfo.scss"
const CardInfo = ({Count,text,icon,color}) => {
  return (
    <Card
          bg={color.toLocaleLowerCase()}
          key={'Success'.toLocaleLowerCase()}
          text={'Success' === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem',height:'15rem' }}
          className="mb-2 "
        >
          {/* <Card.Header>Header</Card.Header> */}
          <Card.Body className='cardBody'>
            <Card.Title><h3 style={{textAlign:'center'}}>{text}</h3> </Card.Title>
           <div className='card-content'> 
           <Card.Title> <h1>{Count?Count:''}</h1> </Card.Title>
            <Card.Text>
            <h1>{icon}</h1>
            </Card.Text>
           </div>
          </Card.Body>
        </Card>
  )
}

export default CardInfo