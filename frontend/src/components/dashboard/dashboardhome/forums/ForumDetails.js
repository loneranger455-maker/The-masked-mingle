import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { GetToken } from '../../../../services/Localstorageservice'
import axios from 'axios'
import Sidebar from '../../Sidebar'
import Topbar from '../../Topbar'
import {BsPeopleFill} from 'react-icons/bs'
import { BiLike , BiComment  } from 'react-icons/bi'
import { FaHandPointRight } from 'react-icons/fa'
function ForumDetails() {
    const {id}=useParams()
    const {access}=GetToken()
    const navigate=useNavigate()

    const [alldata,setAllData]=useState(
        {forumdetails:{image:"",forum_name:"",description:""},
    postobj:[],
    notices:[]
    }
    )
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/user/forumdetails/'+id,{headers:{
            "authorization":`Bearer ${access}`
          }}).then((response)=>{
          console.log(response.data)
          setAllData(response.data)
          }
          )
          .catch((err)=>console.log(err))
      },[])
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-4/5'>
        <Topbar/>
        <div className=' w-full m-10 ml-20 p-10 relative flex bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        <div>
            <img src={'http://127.0.0.1:8000/media/'+alldata.forumdetails["image"]} className='w-[8rem]' alt='logo'/>
        </div>
        <div class="flex flex-col items-center ">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{alldata.forumdetails["forum_name"]}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{alldata.forumdetails["description"]}</p>
    </div>
</div>
<div className='text-3xl absolute right-10 flex'>
    <BsPeopleFill/><p className='p-2 text-sm font-bold'>{alldata.forumdetails["members"]}</p>
</div>

        </div>
        <div className='flex w-full '>
            <div className="w-[60%] ">
            <div className='flex flex-col h-max gap-6  mt-2 w-full'>
      {alldata.postobj.length>0?alldata.postobj.map((value,index)=>(

<div class="flex " onClick={()=>navigate(`/dashboard/posts/${value.postid}`)} >

<div class="block w-[35rem] ml-[5rem] rounded-lg bg-white  shadow-lg hover:bg-[var(--secondarycolor)] cursor-default">
  <div key={index} class="p-6">
    <p className='text-xs'>{value.forum}</p>
    <h5 class="mb-2 text-xl font-bold text-gray-900">{value.title}</h5>
    <p class="mb-4 text-base text-gray-700 ">{value.contentvalue}</p>
    <div className='flex w-[5rem] justify-between'>
      <div className='flex '>
        
        <button ><BiLike/></button>
        <span className='text-sm'>{value.likes}</span></div>
      <div className='flex '><BiComment/><span className='text-sm'>{value.comments_count}</span></div>

    </div>
  
  </div>
  <div class="flex width-full justify-between border-t border-gray-300 px-6 text-gray-600">
    <header className='flex'><p>Posted by:</p><strong>{value.posted_by}</strong></header>
    <p>2 days ago</p>

  </div>
</div>
</div>)):<p className='text-center text-slate-400 '>No posts to show</p>}
   

</div>
            </div>
            <div className='w-[30%]  items-center'>
                <div className='flex flex-col gap-3 items-center'>
                    <p className='mt-4 text-center font-bold text-blue-700'>Notices</p>
                    {alldata.notices.length>0? alldata.notices.map((values,key)=>(
                       <div key={key} className="w-[90%]    flex ">
                       <p className='text-blue-900 text-lg p-2'><FaHandPointRight/></p>
                       <div>
                       <p className='font-bold text-sm'>{values.notice_for}</p>
                       <p className="text-xs">{values.notice_data}</p>
                       </div>
                     
                     </div>
                    )):<p className='text-xs my-6 text-slate-400'>No notices by this forum</p>}
                    <div></div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ForumDetails