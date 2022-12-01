import React, { useState } from "react";
import "./Login.css"
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const loginUser = async (e)=>{
      e.preventDefault();
      const res = await fetch('/signin', {
        method : "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          email, password
        })
      })
      const data = res.json();
      if(res.status === 400 || !data){
        window.alert("invalid user address")
      }else{
        window.alert("login successful")
        navigate('/', {replace: true});
      }
  }
  
  
  
  

  
  
  
  
  
  
    return (
      <div>
        <form method="POST">
          <label htmlFor="email">
            <i className="zmdi zmdi-email "></i>
          </label>
          <input
            type="email;"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          ></input>
          <label htmlFor="password">
            <i className="zmdi zmdi-lock"></i>
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your password"
          ></input>
          <input
            type="submit"
            name="signup"
            id="signup"
            className="signup-btn"
            value="Log In"
            onClick={loginUser}
          />
          <NavLink className="log_txt" to="/signup">
            Create a new account
          </NavLink>
        </form>
      </div>
    );
  };

  export default Login;
