import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TherapistForm=()=> {
  const nav=useNavigate();
    const [name ,setname]=useState('');
    const [password ,setpassword]=useState('');  
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('',{name,password})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
    return( 
    <>
      <form onSubmit={handleSubmit}>
      <h1>Login page</h1>
        <input type="text"
         name="username"
         placeholder="name" 
         onChange={(e)=>setname(e.target.value)}
        /><br />
        <input type="password"
        name="password"
        placeholder="password"
        onChange={(e)=>setpassword(e.target.value)}
        /><br />
        <button onClick={handleclick} >Login</button>
        <h3>Not a user?</h3>
        <button onClick={()=>nav('/register')}>Register now</button>
        </form>
        
    </>
        )
  }
export default TherapistForm