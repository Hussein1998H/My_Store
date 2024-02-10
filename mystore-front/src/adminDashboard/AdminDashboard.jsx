import React from 'react'
import TopBar from './pages/TopBar'
import { Outlet } from 'react-router-dom'
import SideBar from './pages/SideBar'
import './Dashbiard.scss'


const AdminDashboard = () => {
  return (
<div className='admin-dashboard'>
 
<TopBar/><div className='cotaint'>
    <SideBar/>
    <Outlet/>
</div>
</div>
  )
}

export default AdminDashboard