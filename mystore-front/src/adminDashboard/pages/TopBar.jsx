import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import TopBarStyle from '../../components/layout/TopBar.module.scss'
import Cookies from 'universal-cookie';
import axios from 'axios';

import { BaseUrl, EndPoint } from '../../Api/Api';

const TopBar = () => {

    const cookie=new Cookies();
  const token=cookie.get('bearer');

  // const {search,setSearch,updateSearch}=useContext(Search)

  // const [inputSearch,setInputSearch]=useState('');

  async function handelLogout(){

    // window.localStorage.removeItem("email");
    // window.location.pathname="/";
   await axios.put(`${BaseUrl}/${EndPoint.logout}`,null,{
      headers:{
        Authorization:'Bearer '+token
      }
    })
        cookie.remove('bearer');
  
        window.location.pathname='/';
  
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={   { height: '60px'}
}> 
    <Container fluid>
      <Navbar.Brand href="#">My Store</Navbar.Brand>
     
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
         

        </Nav>

        {/* <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e)=>{setInputSearch(e.target.value)}}
          />
          <Button variant="outline-success" onClick={()=>{
            updateSearch(inputSearch);
          }}>Search</Button>
        </Form> */}
        {token?<>
          <Button variant='danger' className={TopBarStyle.item}  onClick={handelLogout}>LogOut</Button>
          </>:null
        } 
 
    </Container>
  </Navbar>
  )
}

export default TopBar