import React, { useEffect, useState } from 'react'
import CardInfo from '../components/CardInfo'
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../Api/Api';
import Cookies from 'universal-cookie';
import './scss/Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGift, faUsers } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
    const [storeDetailes,setStoreDetailes]=useState([]);
    const cookie=new Cookies();
    const token =cookie.get('bearer')


    // let UserCount=storeDetailes[0].userCount
    // let ProductCount=storeDetailes[1].ProductCount
    // let OrderCount=storeDetailes[2].OrderCount 
 async function GetStoreDetaoles(){

    await axios.get(`${BaseUrl}/${EndPoint.storeDetailes}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{setStoreDetailes(response.data.data)
    console.log(response.data.data)})

    }
    useEffect(()=>{

        GetStoreDetaoles()

    },[])

    
    // console.log(storeDetailes.userCount);
    // console.log(storeDetailes.ProductCount);
    // console.log(storeDetailes.OrderCount );
  return (
    <div className=' layout containt'>
        <CardInfo Count={storeDetailes.userCount}
         text={'Users  Count'} icon={<FontAwesomeIcon 
            icon={faUsers} className="icon" />}
            color={'success'}
            />
        <CardInfo Count={storeDetailes.ProductCount} 
        text={'Products Count'} icon={<FontAwesomeIcon 
        icon={faGift} className="icon" />}
        color={'warning'}
        />
        <CardInfo Count={storeDetailes.OrderCount} 
        text={'Orders Count'} icon={<FontAwesomeIcon
         icon={faCartShopping} className="icon" />}
         color={'Info'}
         />
    </div>
  )
}

export default Home