import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./scss/SideBare.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChevronDown, faChevronUp, faGift, faHome, faPeopleRoof, faPlus, faRectangleList, faShop, faTag, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'react-bootstrap'


const SideBar = () => {

  const [openuser, setOpenUser] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openOrder, setopenOrder] = useState(false);

  return (
    <div className='side-bare '>
  
    <ul>

    <li>
       <NavLink className={'link'} to={'/admin/dashboard/home'}> 
       <FontAwesomeIcon icon={faHome} className="icon"/>
       Home
        </NavLink>
        </li>
        <div className='user-manager link' 
        onClick={()=>{
          setOpenUser(!openuser)
        }}
        aria-controls="example-collapse-text"
        aria-expanded={openuser}
        > 
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
          <FontAwesomeIcon icon={faPeopleRoof}  className='icon'/>
          Users Manager
          </div>
          {openuser? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>
        </div >
        <Collapse in={openuser}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-user'}>
             <FontAwesomeIcon icon={faUsers} className="icon" />
             Show Users
            </NavLink>
          </li>
        <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-user'}> 
       <FontAwesomeIcon icon={faUserPlus} className="icon"/>
       ADD User
        </NavLink>
        </li>
        
        </div>
        </Collapse>
        

        <div className='user-manager link' 
        onClick={()=>{
          setOpenProduct(!openProduct)
        }}
        aria-controls="example-collapse-text"
        aria-expanded={openProduct}
        >
          
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
          <FontAwesomeIcon icon={faGift}  className='icon'/>
          Products Manager
          </div>
          {openProduct? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>

        </div >
        <Collapse in={openProduct}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-products'}>
             <FontAwesomeIcon icon={faShop} className="icon" />
             Show Product
            </NavLink>
          </li>
        <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-product'}> 
       <FontAwesomeIcon icon={faPlus} className="icon"/>
       ADD Product
        </NavLink>
        </li>
       
        </div>
        </Collapse>

        <div className='user-manager link' 
        onClick={()=>{
          setopenOrder(!openOrder)
        }}
        aria-controls="example-collapse-text"
        aria-expanded={openOrder}
        >
          
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
          <FontAwesomeIcon icon={faCartShopping}  className='icon'/>
          Order Manager
          </div>
          {openOrder? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>

        </div >
        <Collapse in={openOrder}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-order'}>
             <FontAwesomeIcon icon={faRectangleList} className="icon" />
             Show Orders
            </NavLink>
          </li>
        {/* <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-category'}> 
       <FontAwesomeIcon icon={faPlus} className="icon"/>
       ADD Category
        </NavLink>
        </li> */}
       
        </div>
        </Collapse>


        <div className='user-manager link' 
        onClick={()=>{
          setOpenCat(!openCat)
        }}
        aria-controls="example-collapse-text"
        aria-expanded={openCat}
        >
          
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
          <FontAwesomeIcon icon={faTag}  className='icon'/>
          Category Manager
          </div>
          {openCat? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>

        </div >
        <Collapse in={openCat}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-categories'}>
             <FontAwesomeIcon icon={faRectangleList} className="icon" />
             Show Category
            </NavLink>
          </li>
        <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-category'}> 
       <FontAwesomeIcon icon={faPlus} className="icon"/>
       ADD Category
        </NavLink>
        </li>
       
        </div>
        </Collapse>

    </ul>
</div>
  )
}

export default SideBar