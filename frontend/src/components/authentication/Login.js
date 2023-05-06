import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreToken } from '../../services/Localstorageservice'

function Login() {
    const navigate=useNavigate()
    const handledetails=()=>{

    }
    const [errors,setError]=useState({})
    const handleSubmit=(e)=>{
      e.preventDefault()
      
      const form=new FormData(e.target)
        axios.post('http://localhost:8000/api/user/login/',form).then((resp)=>{
          if(resp.data.errors){
            console.log(resp.response)
            setError(resp.data.errors)
            

          }
          else{
            StoreToken(resp.data.token)
            navigate('/dashboard')
          }
         
        }).catch((err)=>{console.log(err.response.data.errors);
        setError(err.response.data.errors)}
        )

    }
  return (
    <div className='flex w-screen h-screen'>
<div className='w-2/5 h-screen bg-[#1AEBB6]'>
      <div className='w-3/5 h-screen'>
    <div className='absolute flex w-2/3 h-2/3 top-28 left-44 shadow-xl shadow-slate-700 '>
      <div className='w-2/5  bg-[#1AEBB6]'>
        <div className='ml-16 mt-16'>
        <img className="w-[13rem]" src={require('../../assets/logo2.png')} alt='logo' />
        <p className='ml-8 mt-8 text-3xl font-extrabold'>StuForum</p>
        <p className='font-bold'>Your queries are answered</p>
        </div>
       

      </div>
  <div className='ml-12 '>   
  <div className='relative  m-16 mt-8 w-4/5 h-4/5'>
<div>
    <p className='text-xl underline underline-offset-8 decoration-[#1AEBB6] decoration-4 text-left'>Login</p>
    <p className='text-xs text-left mt-2'>Welcome user.Let's log you in</p>
</div>
<div className='relative top-12'>
    <form className='flex flex-col text-left' onSubmit={handleSubmit} >
       
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            
            <svg class="absolute m-2 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

            <input onChange={handledetails} type="email" id="email" name='email' class="px-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your email" required/>
        {errors.email?<p className='text-xs text-red-800'>{errors.email}</p>:""}
        </div> 
        <div>
            
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <svg class="w-7 h-7 absolute m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
           
            <input type="password" name="password" onchange={handledetails} id="password" class="px-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your password" required/>
            {errors.password?<p className='text-xs text-red-800'>{errors.password}</p>:""}

        </div>
        <div className='relative top-10 '>
         <input type='submit' className=' bg-[#1AEBB6]  border border-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' value='Login'/> 
        </div> 
        <div className='relative top-16 bottom-0'>
        <p className='text-sm text-center'>New to our community? 
        <Link to={'/signup'}>
        <button className='text-blue-900'> Register now</button> 
        </Link>
        </p> 
        </div>
        </form>
        
</div>

</div>
</div>
</div>
    </div>
    </div>

    </div> 
   
  )
}

export default Login