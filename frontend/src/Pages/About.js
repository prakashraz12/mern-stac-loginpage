import React from 'react'
import './About.css'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const callAboutpage = async ()=>{
    try{
      const res = await fetch('/about' ,{
      method:"GET",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    console.log(data)
    if(!res.status === 200){
      const error = new Error(res.error);
      throw error
    }
    }catch(err){
      console.log(err)
      navigate('/login', {replace: true});
    }
  }
  useEffect(()=>{
     callAboutpage();
  },[])
  return (
    <div className='about'>
      <form  method='GET'>
      <img src='img/depositphotos_207663178-stock-photo-image-of-happy-young-man.jpg' alt='img'/>
      <h2>Prakash Shrestha</h2>
      <p className='title_info'>web developer
      </p>
    
      <p name="phobe-num" className="phone_number"><i className="zmdi zmdi-phone"></i> 9861374362</p>
      <p className='email_info'><i className="zmdi zmdi-email"></i> rzprakash16@gmail.com</p>
      <input type='submit' className='edit_btn' value='Edit' name='btn'/>
      </form>
    </div>
  )
}

export default About