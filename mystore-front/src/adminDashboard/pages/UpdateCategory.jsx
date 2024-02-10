import React, { useContext, useEffect, useState } from 'react'
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
import { toggel } from '../../Context/ToggelConstext';

const UpdateCategory = () => {
    const[desc,setDesc]=useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const[name,setName]=useState('')
    const[image,setImage]=useState('')
    const[show,SetShow]=useState(false);
    const[showImg,SetShowImg]=useState(false);
    const[accept,SetAccept]=useState(false);
    const {isToggled,ToggelUpdate}=useContext(toggel)
    
  const cookie =new Cookies()
  const token=cookie.get('bearer')
  const nav=useNavigate()
  let cat_id=window.location.pathname.split('/').slice(-1)[0];

  async function getCategory(){
    let res=await axios.get(`${BaseUrl}/${EndPoint.categoryDetails}/${cat_id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
            setName(response.data.data.name)
            setDesc(response.data.data.desc)
            setImage(response.data.data.image)
            console.log(response.data.data);
        }
    )
    }


    


useEffect(()=>{
    getCategory();
},[])



 async function Submit(e) {
    
    e.preventDefault();

    try {
        const formData = new FormData();
    // Appending data
    formData.append('name',name)
    formData.append('desc',desc)
    formData.append('image',image)

    let res=await axios.post(`${BaseUrl}/${EndPoint.updateCategory}/${cat_id}?_method=PUT`,formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if (res.status===200) {
        SetShow(true)
   
        setTimeout(()=>{
            SetShow(false)
            nav('/admin/dashboard/all-categories')
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
    <div  className="containt layout"    style={isToggled===true?{width:'100%'}:null}
>
    {show && <SAlert title={'Product Add'} body={'CAtegory Update Successfully'} color={'primary'}/>}
     <Form className='formprod' onSubmit={Submit}>
      <Form.Group style={{textAlign:'center'}}>
        <h1> ADD Category</h1>
      </Form.Group>
    <Row className="mb-3">
      
      <Form.Group as={Col} controlId="formGridEmail">
        <FloatingLabel controlId="name" label="Name">
        <Form.Control type="text"  value={name} onChange={(e)=>setName(e.target.value)} />
        </FloatingLabel>
        <Form.Text className="text-muted">
      {accept&&name===''?'please Enter name':null}
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
        value={desc} onChange={(e)=>setDesc(e.target.value)} 
      />
    </FloatingLabel>
    <Form.Text className="text-muted">
      {accept&&desc===''?'please Enter Description':null}
      </Form.Text>
      </Form.Group>
      
      {/* Image */}

      <Form.Group as={Col} controlId="formGridZip" style={{textAlign:'center'}}>
        {/* <Image src={selectedImage} style={{width:'100%',height:'200px'}} alt="Selected"/> */}
        {selectedImage && <Image src={selectedImage}  alt="Selected" className='imgprod'/>}
      </Form.Group>

     
    </Row>
   <Row>
       {/* files */}

       <Form.Group as={Col} controlId="formFile"  className='mt-2 mb-3'>

     <Form.Control type="file" size="lg"  onChange={handleImageChange} />
     </Form.Group>
   </Row>
    <Button variant="primary" type="submit">
      ADD Category
    </Button>
  </Form>
      </div>
  )
}

export default UpdateCategory