import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./scss/SideBare.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faChevronDown, faChevronUp, faGift, faHome, faPeopleRoof, faPlus, faRectangleList, faShop, faTag, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'react-bootstrap'
import { toggel } from '../../Context/ToggelConstext'


const SideBar = () => {

  const [openuser, setOpenUser] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openOrder, setopenOrder] = useState(false);
  // const [toggel, settoggel] = useState(false);
  // console.log(toggel);
  const {isToggled,ToggelUpdate}=useContext(toggel)
  console.log(isToggled);
  const width={
    width:'100px'
  }
  return (
    <div className='side-bare ' style={isToggled===true?width:null}>
  
  <div className='toggelcontainer'>
    <span className={isToggled===true?'hidden':null} ><h3>Dashboard</h3></span>
  <FontAwesomeIcon icon={faBars} className="toggelbtn" onClick={()=>{ToggelUpdate()}}/>  
  </div>
    <ul>
    <li>
       <NavLink className={'link'} to={'/admin/dashboard/home'}> 
       <FontAwesomeIcon icon={faHome} className="icon"/>
       <span className={isToggled===true?'hidden':null}>Home</span>
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
         <span className={isToggled===true?'hidden':null}>Users Manager</span>
          </div>
          {openuser? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>
        </div >
        <Collapse in={openuser}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-user'}>
             <FontAwesomeIcon icon={faUsers} className="icon" />
            <span className={isToggled===true?'hidden':null}>Show Users</span> 
            </NavLink>
          </li>
        <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-user'}> 
       <FontAwesomeIcon icon={faUserPlus} className="icon"/>
       <span className={isToggled===true?'hidden':null}>ADD User</span> 
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
         <span className={isToggled===true?'hidden':null}>Products Manager</span> 
          </div>
          {openProduct? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>

        </div >
        <Collapse in={openProduct}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-products'}>
             <FontAwesomeIcon icon={faShop} className="icon" />
             <span className={isToggled===true?'hidden':null}>Show Product</span>
            </NavLink>
          </li>
        <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-product'}> 
       <FontAwesomeIcon icon={faPlus} className="icon"/>
      <span className={isToggled===true?'hidden':null}>ADD Product</span> 
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
         <span className={isToggled===true?'hidden':null}>Order Manager</span> 
          </div>
          {openOrder? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>

        </div >
        <Collapse in={openOrder}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-order'}>
             <FontAwesomeIcon icon={faRectangleList} className="icon" />
            <span className={isToggled===true?'hidden':null}>Show Orders</span> 
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
         <span className={isToggled===true?'hidden':null}>Category Manager</span> 
          </div>
          {openCat? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
          
         
          </div>

        </div >
        <Collapse in={openCat}>
        <div id="example-collapse-text">
        <li>
          <NavLink className={'link'} to={'/admin/dashboard/all-categories'}>
             <FontAwesomeIcon icon={faRectangleList} className="icon" />
             <span className={isToggled===true?'hidden':null}>Show Category</span>
            </NavLink>
          </li>
        <li>
       <NavLink className={'link'} to={'/admin/dashboard/add-category'}> 
       <FontAwesomeIcon icon={faPlus} className="icon"/>
      <span className={isToggled===true?'hidden':null}>ADD Category</span> 
        </NavLink>
        </li>
       
        </div>
        </Collapse>

    </ul>
</div>
  )
}

export default SideBar