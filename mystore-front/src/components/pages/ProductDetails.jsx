import React, { useEffect, useState } from 'react'
import "../../components/all.min.css"
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../tools/api';
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import SAlert from '../../adminDashboard/components/SAlert';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {

    const [product,setProduct]=useState([]);
    const[show,SetShow]=useState(false);
    const [count,setCount]=useState(0);
    let cookie=new Cookies();
    let myprod=cookie.get('products');
    let token=cookie.get('bearer')
    let prod_id=window.location.pathname.split('/').slice(-1)[0];
    const nav=useNavigate();
      async function getProduct(){
        let res=await axios.get(`${BaseUrl}/${EndPoint.productDetails}/${prod_id}`)
        .then(response=>setProduct(response.data.data))
        }


    useEffect(()=>{
      getProduct();
    },[])
    function AddCart() {
      cookie.set('products',[...myprod,{
        id: prod_id,
        qty:count

      }])
      SetShow(true)
        setTimeout(()=>{
          SetShow(false)
          cookie.update()
          nav('/')
        },1000)
    }
  console.log(myprod);
  return (
    <div>
<section className="py-5">
    <div className="container">
    {show&&<SAlert style={{justifyContent:'center'}} title={' Order '} body={'Order update Successfully'} color='primary'/>}

      <div className="row ">
        <aside className="col-lg-6">
          <div className="border rounded-4 mb-3 d-flex justify-content-center">
            <div   className="rounded-4">
              <img alt='img' style={{maxWidth:'100%', maxHeight: '500px', margin: 'auto'}} className="rounded-4 fit" src={`${BaseUrl}/${product.image}`} id="img1"/>
            </div>
          </div>
         
        
        </aside>
        <main className="col-lg-6">
          <div className="ps-lg-3">
            <h4 className="title text-dark">
                {product.name} <br />
              
            </h4>
            <div className="d-flex flex-row my-3">
              <div className="text-warning mb-1 me-2">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <span className="ms-1">
                  4.5
                </span>
              </div>
              <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
             
            </div>
  
            <div className="mb-3">
              <span className="h5">${product.price}</span>
        
            </div>
  
            <p>
            {product.description}
            </p>
  
            <div className="row">
                
              <dt className="col-3">Category:</dt>
              <dd className="col-9">{product.categoryname}</dd>

              
            </div>
  
            <hr />
  
            <div className="row mb-4">
   
            
              {token?
              <div className="col-md-4 col-6 mb-3">
              <label className="mb-2 d-block">Quantity</label>
              <div className="input-group mb-3" style={{width: '170px'}}>
                <button onClick={()=>{
                  if(count>-1){

                      setCount(count-1)
                  }
                }}className="btn btn-white border border-secondary px-3" type="button" id="minus">
                  <i className="fas fa-minus" ></i>
                </button>
                <input type="text" className="form-control text-center border border-secondary bg-white" disabled value={count} id="num"  />
                <button onClick={()=>{
                  setCount(count+1)
                }} className="btn btn-white border border-secondary px-3" type="button"id="plus" >
                  <i className="fas fa-plus d-block" ></i>
                </button>
              </div>
            </div>
              :null}
            </div>
            {token?<Button onClick={AddCart}  className="btn btn-primary shadow-0  mx-2 my-2"> <i className="fa-solid fa-cart-shopping"></i> Add to cart </Button>:null}
            <Button  className="btn btn-light border border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg"></i> Save </Button>
          </div>
        </main>
      </div>
    </div>
  </section>
    </div>
  )
}

export default ProductDetails