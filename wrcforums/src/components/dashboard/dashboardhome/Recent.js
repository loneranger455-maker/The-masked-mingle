import React, { useEffect, useState } from 'react'
import {BiLike} from 'react-icons/bi'
import {BiComment} from 'react-icons/bi'
import axios from 'axios'
import { GetToken } from '../../../services/Localstorageservice'
import { useNavigate } from 'react-router'


 
 
function Recent() {
  const [post,setPost]=useState([])
  const {access}=GetToken()
  const [shownotification,setShowNotification]=useState(false)
  const navigate=useNavigate()
  const changelikeColor=(e)=>{
    e.target.style.backgroundColor="blue"
  }
  useEffect(()=>{

    
    axios.get('http://127.0.0.1:8000/api/user/allposts/',{headers:{
      "authorization":`Bearer ${access}`
    }}).then((response)=>
    setPost(response.data)
   
    )
    .catch((err)=>console.log(err))
},[])
 return (
    <div className='flex flex-col h-[30rem] gap-6  mt-2 w-2/3'>
      {post.map((value,index)=>(

<div class="flex " onClick={()=>navigate(`posts/${value.postid}`)} >

<div class="block w-[35rem] ml-[5rem] rounded-lg bg-white  shadow-lg hover:bg-[var(--secondarycolor)] cursor-default">
  <div key={index} class="p-6">
    <p className='text-xs'>{value.forum}</p>
    <h5 class="mb-2 text-xl font-bold text-gray-900">{value.title}</h5>
    <p class="mb-4 text-base text-gray-700 ">{value.content}</p>
    <div className='flex w-[5rem] justify-between'>
      <div className='flex '>
        
        <button onClick={changelikeColor}><BiLike/></button>
        <span className='text-sm'>{value.likes}</span></div>
      <div className='flex '><BiComment/><span className='text-sm'>{value.comments_count}</span></div>

    </div>
  
  </div>
  <div class="flex width-full justify-between border-t border-gray-300 px-6 text-gray-600">
    <header className='flex'><p>Posted by:</p><strong>{value.posted_by}</strong></header>
    <p>2 days ago</p>

  </div>
</div>
</div>))}
   

</div>
  )
}

export default Recent