import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './layout.module.scss'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './Layout';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../tools/api';
import TopBarStyle from './TopBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function AppBar() {
    // init app state
    const appContext = useContext(AppContext)
    const cookie=new Cookies();
    const token=cookie.get('bearer');

    // init state
    const [search, setSearch] = useState('')
    const [data, setData] = useState('')

   async function getData() {

    try {
 if (token) {
    let res=axios.get(`${BaseUrl}/${EndPoint.profile}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        setData(response.data.data)
    })
 }
    } catch (error) {
        console.log(error);
    }

  
    }
    useEffect(()=>{

        if (token) {
            getData();
        }
    },[])
    async function handelLogout(){

        // window.localStorage.removeItem("email");
        // window.location.pathname="/";
       await axios.put(`${BaseUrl}/${EndPoint.logout}`,null,{
          headers:{
            Authorization:'Bearer '+token
          }
        })
            cookie.remove('bearer');
            cookie.remove('products');
            cookie.update();
      
            window.location.pathname='/';
      
      }
    return (
        <Navbar expand="lg" className={styles.appbar + ' ' + "bg-body-tertiary"}>
            <Container fluid>
                {/* <Navbar.Brand href="/">My Store</Navbar.Brand> */}
                <Link to='/' className='navbar-brand' >My Store</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link href="register">Register</Nav.Link> */}
                        {/* <Link to='register' className='nav-link' >Register</Link>
                        <Link to='login' className='nav-link' >Login</Link> */}

                        {!token?<>
                 <NavLink className='nav-link' to={'/register'}>Rigister</NavLink>
                 <NavLink className='nav-link' to={'/login'}>Login</NavLink>
                  </>:
                  <>
                  <NavLink className='nav-link' to={'/my-order'}>My Order</NavLink>
                 <NavLink className='nav-link' to={'/'}>{data!==''?data.name:null}</NavLink>
                  </>
                  }
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <Button onClick={(e) => {
                            appContext.setSearch(search)
                        }} variant="outline-success">Search</Button>
                    </Form>
                    {token?<>
                        <Button  variant='danger' className={TopBarStyle.item+' '+'mx-3 my-3'}  onClick={handelLogout}>LogOut</Button>
                        <NavLink className={TopBarStyle.cartItem+' '+TopBarStyle.cartItem} to={'/my-cart'}>Cart <FontAwesomeIcon icon={faCartShopping} /></NavLink>


                    </>:null}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppBar;