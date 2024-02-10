import React, { useContext, useEffect, useState } from 'react'
import CardInfo from '../components/CardInfo'
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../Api/Api';
import Cookies from 'universal-cookie';
import './scss/Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGift, faUsers } from '@fortawesome/free-solid-svg-icons';
import { toggel } from '../../Context/ToggelConstext';
const Home = () => {
    const [storeDetailes,setStoreDetailes]=useState([]);
    const cookie=new Cookies();
    const token =cookie.get('bearer')
    const {isToggled,ToggelUpdate}=useContext(toggel)

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
    <div className=' layout containt'    style={isToggled===true?{width:'100%'}:null}
>
        <CardInfo Count={storeDetailes.userCount}
         text={'Users  Count'} icon={<FontAwesomeIcon 
            icon={faUsers} className="icon" />}
            color={'success'}
            shcolor={'rgb(0 199 106)'}
            />
        <CardInfo Count={storeDetailes.ProductCount} 
        text={'Products Count'} icon={<FontAwesomeIcon 
        icon={faGift} className="icon" />}
        color={'warning'}
        shcolor={'rgb(255 192 0)'}
        />
        <CardInfo Count={storeDetailes.OrderCount} 
        text={'Orders Count'} icon={<FontAwesomeIcon
         icon={faCartShopping} className="icon" />}
         color={'Info'}
         shcolor={'rgb(13 202 240)'}
         />
    </div>
  )
}

export default Home