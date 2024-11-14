'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const signUp = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignUp = async()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Success", response.data);
      router.push('/signin')

      
      
    } catch (error:any) {
      console.log("Signup Failed");
      toast.error(error.message)
      
      
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input 
      id='username'
      value={user.username}
      onChange={(e)=>setUser({...user, username:e.target.value})}
      placeholder='username' type='text' />

<label htmlFor='email'>email</label>
      <input 
      id='email'
      value={user.email}
      onChange={(e)=>setUser({...user, email:e.target.value})}
      placeholder='email' type='email' />

<label htmlFor='password'>password</label>
      <input 
      id='password'
      value={user.password}
      onChange={(e)=>setUser({...user, password:e.target.value})}
      placeholder='password' type='password' />

      <button onClick={onSignUp}>{buttonDisabled ? "Please fill the form " : "Sign Up"}</button>
      <Link href="/signin">Visit Login Page</Link>

    </div>
  )
}

export default signUp