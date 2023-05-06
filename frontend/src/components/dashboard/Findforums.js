import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import {AiFillLock} from 'react-icons/ai'
import {AiFillUnlock} from 'react-icons/ai'
import axios from 'axios'
import { GetToken } from '../../services/Localstorageservice'

import { Link } from 'react-router-dom'

function Noticerightbar(){
    
    
  


    return(
      <div className=' absolute top-[15rem] right-10 flex flex-col gap-10 h-[25rem] w-[18rem] '>
            <Link to='/dashboard/createforum/'><button  className='w-[12rem] bg-slate-200 p-5 rounded-lg border-2 border-slate-300 hover:bg-slate-300'>Create a forum</button></Link> 
            <Link to='/dashboard/forums/'><button className='w-[12rem] bg-slate-200  p-5  rounded-lg border-2 border-slate-300 hover:bg-slate-300'>View my forums</button></Link>
            <Link to='/dashboard/forums/myforums'><button className='w-[12rem] bg-slate-200  p-5  rounded-lg border-2 border-slate-300 hover:bg-slate-300'>View joined forums</button></Link>
      
        
      </div>
    )
  }
  

function Findforums() {
    const navigate=useNavigate()
    var[forums,setForums]=useState([])
    const [refresh,setRefresh]=useState()
    let {access}=GetToken()
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/user/allforums/',{headers:{
            "authorization":`Bearer ${access}`
          }}).then((response)=>{
        console.log(response)
        setForums(response.data)
        
          }
          )
          .catch((err)=>console.log(err))
        
    },[refresh])

    const joinForums=(id)=>{
        axios.get('http://127.0.0.1:8000/api/user/joinforum/'+id,{headers:{
            "authorization":`Bearer ${access}`
          }}).then((response)=>{
        console.log(response)
        setRefresh("refr")
          }
          )
          .catch((err)=>console.log(err))
    }
  return (
    <div className="flex">
        <Sidebar value='findforums'/>
        <div className="w-4/5">
        <Topbar />
        <div className='flex flex-col  mt-8 ml-[4rem]'>
        
<form class="flex items-center">   
    <label for="simple-search" class="sr-only">Search Forums</label>
    <div class="relative w-[30rem] ml-16">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search forums" required/>
    </div>
    <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span class="sr-only">Search</span>
    </button>
</form>

      
        <div className='flex flex-col m-10 mt-12 max-w-xl gap-4 overflow-scroll h-[28rem]' >
{forums.length>0?
    forums.map((value,index)=>(
        <div key={index} class="flex bg-white shadow-lg w-full h-[60%] gap-4 " >
        <div className='h-[8rem] rounded-full' onClick={()=>navigate(`/dashboard/forums/${value.forumid}`)}>
            <img src={'http://127.0.0.1:8000/'+value.image} alt='demo' className='h-2/3'/>
        </div>
        <div className='flex flex-col relative '>
            <div className='flex' onClick={()=>navigate(`/dashboard/forums/${value.forumid}`)} >
            <h1 className='font-extrabold'>{value.forum_name} </h1>
            {value.privacy==="public"?
            <p className='text-blue-900'> <AiFillUnlock/></p>:
            <p className='text-red-900'> <AiFillLock/></p>
            }
            </div>
            
            <h3 className='font-light text-md'>{value.description}</h3>
            <div className='absolute bottom-4 flex  justify-between w-[27rem]'>
                <h3 className='font-light text-sm  text-blue-900'>{value.members} members</h3>
                <div>
                    <button className=' bg-white  shadow-xl flex text-sm'>
                        {value.privacy==="public"?<p className='bg-[var(--primarycolor)] px-2 py-0.5 rounded' onClick={()=>joinForums(value.forumid)}>Join</p>:<p className='bg-red-800 text-white px-2 py-1 rounded'>Request to join</p>}
                        </button>
                </div>
            </div>
        </div>

</div>
    ))
:"no forums to show at the moment"
}
      </div>
<Noticerightbar/>
      

    </div>
</div>
    </div>
  )
}

export default Findforums