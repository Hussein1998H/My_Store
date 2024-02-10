import React, { useEffect, useState } from 'react'
import "../Dashbiard.scss"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./scss/AddProduct.scss"
import { FloatingLabel, Image } from 'react-bootstrap';
import axios from 'axios';
import { BaseUrl, EndPoint } from '../../Api/Api';
import Cookies from 'universal-cookie';
import SAlert from '../components/SAlert';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const[getCat,setGetCat]=useState([]);
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const[price,setPrice]=useState('')
    const[image,setImage]=useState('')
    const[show,SetShow]=useState(false);
    const[showImg,SetShowImg]=useState(false);
    const[accept,SetAccept]=useState(false);
    const nav=useNavigate()
  const cookie =new Cookies()
  const token=cookie.get('bearer')
  let prod_id=window.location.pathname.split('/').slice(-1)[0];

  async function getProduct(){
    let res=await axios.get(`${BaseUrl}/${EndPoint.productDetails}/${prod_id}`)
    .then(response=>{
            setName(response.data.data.name)
            setDescription(response.data.data.description)
            setCategory(response.data.data.categoryname)
            setPrice(response.data.data.price)
            setImage(response.data.data.image)
            console.log(response.data.data);
        }
    )
    }

    async function getCatData() {
        let res=axios.get(`${BaseUrl}/${EndPoint.categories}`)
        .then(response=>setGetCat(response.data.data))
      }
    


useEffect(()=>{
  getProduct();
  getCatData();
},[])



 async function Submit(e) {
    
    e.preventDefault();

    try {
        const formData = new FormData();
    // Appending data
    formData.append('name',name)
    formData.append('description',description)
    formData.append('category',category)
    formData.append('price',price)
    formData.append('image',image)

    let res=await axios.post(`${BaseUrl}/${EndPoint.updateProduct}/${prod_id}?_method=PUT`,formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if (res.status===200) {
        SetShow(true)
   
        setTimeout(()=>{
            SetShow(false)
            nav('/admin/dashboard/all-products')
        },1000)
    }
    } catch (error) {
        console.log(error);
    }

  }


  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        SetShowImg(true)
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImage(file)
    }
  };

  return (
    <div  className="containt layout">


      {show && <SAlert title={'Product Add'} body={'product Add Successfully'} color={'primary'}/>
}
       <Form className='formprod' onSubmit={Submit}>
        <Form.Group style={{textAlign:'center'}}>
          <h1> Update Product</h1>
        </Form.Group>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
          <FloatingLabel controlId="name" label="Name">
          <Form.Control type="text" placeholder="Enter email" value={name} onChange={(e)=>setName(e.target.value)} />
          </FloatingLabel>
          <Form.Text className="text-muted">
        {accept&&name===''?'please Enter name':null}
        </Form.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <FloatingLabel controlId="cat" label='Category'>
          <Form.Select onChange={(e)=>setCategory(e.target.value)}  value={category}>
            <option label='Select ...'></option>
            {getCat.map((el,index)=>{return <option key={index} value={el.name}>{el.name}</option>})}
            <option>...</option>
          </Form.Select>
          </FloatingLabel>
          <Form.Text className="text-muted">
        {accept&&category===''?'please select Category':null}
        </Form.Text>
        </Form.Group>
      </Row>

      
      <Row className='mb-3'> 
      <Form.Group as={Col} controlId="formGridZip">
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '200px' }}
          value={description} onChange={(e)=>setDescription(e.target.value)} 
        />
      </FloatingLabel>
      <Form.Text className="text-muted">
        {accept&&description===''?'please Enter Description':null}
        </Form.Text>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip" style={{textAlign:'center'}}>
          {/* <Image src={selectedImage} style={{width:'100%',height:'200px'}} alt="Selected"/> */}
          {image  && showImg===false? <Image src={`${BaseUrl}/${image}`}  className='imgprod'/>:null}
          {selectedImage&& showImg && <Image src={selectedImage}  alt="select" className='imgprod'/>}
        </Form.Group>
      </Row>
      

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <FloatingLabel controlId="price" label='price'>
          <Form.Control  value={price} onChange={(e)=>setPrice(e.target.value)} />
          </FloatingLabel>
          <Form.Text className="text-muted">
        {accept&&price===''?'please Enter Price':null}
        </Form.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formFile"  className='mt-2' >

        <Form.Control type="file" size="lg"  onChange={handleImageChange} />
        </Form.Group>
      </Row>



      <Button variant="primary" type="submit">
        Update Product
      </Button>
    </Form>
        </div>
  )
}

export default UpdateProduct