import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GetToken } from '../../../../services/Localstorageservice'
import axios from 'axios'
import {TbEdit} from 'react-icons/tb'

function Myforums() {
  const {access}=GetToken()
  const [forums,setForums]=useState([{title:"Wrc Bctians",description:"Lets discuss bct guys of all batches.Welcome to the community",members:232},
  {title:"Lamachaur",description:"Guys living in lamachaur are welcome",members:122},
  {title:"TU Students",description:"We welcome all the TU students across Nepal to our forums",members:"1.1k"}])
  const navigate=useNavigate('')
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/user/myforums/',{headers:{
        "authorization":`Bearer ${access}`
      }}).then((response)=>{
      console.log(response.data)
      setForums(response.data)
      }
      )
      .catch((err)=>console.log(err))
  },[])
  return (
    <div className='flex flex-col  mt-6 ml-[4rem]'>
      <div className='max-w-xl flex'>
        <button onClick={()=>navigate('/dashboard/forum')} className='w-1/2 bg-[var(--secondarycolor)] p-2'>Joined Forums</button>
        <button onClick={()=>navigate('/dashboard/forum/myforums')} className='w-1/2 bg-[var(--primarycolor)] p-2'>My Forums</button>
        </div>
        <div className='flex flex-col m-8 max-w-xl gap-4 overflow-scroll h-[24rem]'>
{
    forums.map((value,index)=>(
        <div key={index} class="flex bg-white shadow-lg w-full h-[60%] gap-4 " onClick={()=>navigate(`/dashboard/forums/${value.forumid}`)}> 
        <div>
        <img src={`http://127.0.0.1:8000/${value.image}`} className='h-[6rem] rounded-full'/>

        </div>
        <div className='flex flex-col relative ' >
        <h1 className='font-extrabold'>{value.forum_name}</h1>
            <h3 className='font-light text-md'>{value.description}</h3>
            <div className='absolute bottom-4 flex  justify-between w-[27rem]'>
            <h3 className='font-light text-sm text-blue-900'>{value.members} members</h3>
            <div className='absolute bottom-4 flex  justify-between w-[27rem]'>
              
                    <button className='bg-white shadow-xl flex text-sm'><TbEdit/> Edit</button>
                </div>
              
            </div>
        </div>

</div>
    ))
}
      </div>

      

    </div>
  )
}

export default Myforums