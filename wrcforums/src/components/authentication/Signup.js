import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { StoreToken } from '../../services/Localstorageservice'

function Signup() {
    const navigate=useNavigate()
    const [errors,setError]=useState({})
  
    const handlesubmit=(e)=>{
      e.preventDefault()
        const formdata=new FormData(e.target)
        axios.post('http://localhost:8000/api/user/auth/',formdata).then((resp)=>{
        if(resp.data.errors){
          console.log(resp.data.errors)
          setError(resp.data.errors)
        }
        else{
          StoreToken(resp.data.token)
          navigate('/dashboard')
        }
      }
        )
        .catch((err)=>{
          console.log(err.response.data.errors)
          setError(err.response.data.errors)
        }
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
  <div className='ml-12' >   
  <div className='relative  m-16 mt-8 w-4/5 h-4/5'>
    <div>
        <p className='text-xl underline underline-offset-8 decoration-[#1AEBB6] decoration-4 text-left'>SignUp</p>
        <p className='text-xs text-left mt-2'>Enter the following details and join our community</p>
    </div>
    <div className='relative top-6'>
        <form className='flex flex-col text-left' onSubmit={handlesubmit}>
        <div class="relative z-0 w-full mb-6 group">
      <input type="email" name="email" id="floating_email" 
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {errors.email?
   <p  className='absolute mt-12 text-xs text-red-700'>{errors.email}</p> :""}
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="username"  id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="username"class=" absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
       
      </div>
      {errors.username?
   <p  className='absolute mt-12 text-xs text-red-700'>{errors.username}</p> :""}    

  </div>

  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="password"  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>
    {errors.password?
   <p  className='absolute mt-12 text-xs text-red-700'>{errors.password}</p> :""}
    <div class="relative z-0 w-full mb-6 group">
        <input type="password"  name="passwordconfirm" id="confirm" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="confirm" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
    </div>
    {errors.passwordconfirm?
   <p  className='absolute mt-12 text-xs text-red-700'>{errors.passwordconfirm}</p> :""}
  </div>
  <div className='relative top-2 '>
             <input type='submit' className=' bg-[#1AEBB6]  border border-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' value='SignUp'/> 
  </div> 
            <div className='relative top-8 bottom-0'>
            <p className='text-sm text-center'>Already have an account?
            <Link to={'/'}>
            <button className='text-blue-900'> Login</button>
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



export default Signup