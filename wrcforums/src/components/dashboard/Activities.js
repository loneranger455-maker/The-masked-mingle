import React, { useEffect, useState } from 'react'
import { BiComment, BiLike } from 'react-icons/bi'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { GetToken } from '../../services/Localstorageservice'
import axios from 'axios'

function Activities() {
  const [post,setPost]=useState([])
  const {access}=GetToken()
  const navigate=useNavigate()

  useEffect(()=>{

    
    axios.get('http://127.0.0.1:8000/api/user/getuserpost/',{headers:{
      "authorization":`Bearer ${access}`
    }}).then((response)=>
    setPost(response.data)
   
    )
    .catch((err)=>console.log(err))
},[])
  return (
    <div className='flex'>
    <Sidebar value="activities" />
    <div  className='w-4/5'>
    <Topbar/>
    <div className='mt-10 w-2/3'>
      <p className='font-extrabold text-center'>My Posts</p>
    <div className='flex flex-col h-[30rem] gap-6  mt-2 w-full'>
      {post.map((value,index)=>(

<div class="flex " onClick={()=>navigate(`/dashboard/posts/${value.postid}`)} >

<div class="block w-[35rem] ml-[5rem] rounded-lg bg-white  shadow-lg hover:bg-[var(--secondarycolor)] cursor-default">
  <div key={index} class="p-6">
    <p className='text-xs'>{value.forum}</p>
    <h5 class="mb-2 text-xl font-bold text-gray-900">{value.title}</h5>
    <p class="mb-4 text-base text-gray-700 ">{value.content}</p>
    <div className='flex w-[5rem] justify-between'>
      <div className='flex '>
        
        <button><BiLike/></button>
        <span className='text-sm'>{value.likes}</span></div>
      <div className='flex '><BiComment/><span className='text-sm'>{value.comments_count}</span></div>

    </div>
  
  </div>

</div>
</div>))}
    </div>
    </div>

   </div>
</div>
  )
}

export default Activities