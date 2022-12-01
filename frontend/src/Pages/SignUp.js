import React, { useState } from "react";
import "./Signup.css";
import {useNavigate} from 'react-router-dom';
import { NavLink} from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    profession: "",
  });
  let name , value;
  const handleInput = (e) =>{
    console.log(e)
    name = e.target.name
    value =e.target.value

    setUser({...user ,[name]:value})
  }

  const postData = async (e) =>{
    e.preventDefault();

    const { name, email, phone, password, confirmpassword, profession} = user;
 const res =   await fetch("/register", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name, email, phone, password, confirmpassword, profession
      })
    })
    const data = await res.json();
    if(data.status === 422 || !data){
      window.alert("invalid Registration")
    }else{
      window.alert("successfull Registration")
      navigate('/login', {replace: true});
    }
  }
  return (
    <div className="signup">
      <form method="POST">
        <label htmlFor="name">
          <i className="zmdi zmdi-account "></i>
        </label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={user.name}
          onChange={handleInput}
          placeholder="Enter Your Name"
        ></input>
        <label htmlFor="profession">
          <i className="zmdi zmdi-account"></i>
        </label>
        <input
          type="text"
          name="profession"
          autoComplete="off"
          value={user.profession}
          onChange={handleInput}
          placeholder="Enter Your Job title"
        ></input>
        <label htmlFor="phone">
          <i className="zmdi zmdi-phone "></i>
        </label>
        <input
          type="number"
          name="phone"
          autoComplete="off"
          value={user.phone}
          onChange={handleInput}
          placeholder="Enter Your Name phone number"
        ></input>
        <label htmlFor="email">
          <i className="zmdi zmdi-email "></i>
        </label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={user.email}
          onChange={handleInput}
          placeholder="Enter Your Email"
        ></input>
        <label htmlFor="password">
          <i className="zmdi zmdi-lock"></i>
        </label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={user.password}
          onChange={handleInput}
          placeholder="Enter Your password"
        ></input>
        <label htmlFor="confirmpassword">
          <i className="zmdi zmdi-lock"></i>
        </label>
        <input
          type="password"
          name="confirmpassword"
          autoComplete="off"
          value={user.confirmpassword}
          onChange={handleInput}
          placeholder="Enter confirm password"
        ></input>
        <button onClick={postData}> post</button>
        <NavLink className="log_txt" to="/login">
          Already an account ? Login Now
        </NavLink>
      </form>
    </div>
  );
};

export default SignUp;
