import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import {FaHandPointRight} from 'react-icons/fa'
import { GetToken } from "../../services/Localstorageservice";
import axios from "axios";

function Notice() {
  const {access}=GetToken()
  const navigate=useNavigate()
  const [notices,setNotices]=useState([])
  useEffect(()=>{

    
      axios.get('http://127.0.0.1:8000/api/user/notices/',{headers:{
        "authorization":`Bearer ${access}`
      }}).then((response)=>
      setNotices(response.data)
      )
      .catch((err)=>console.log(err))
  },[])
  return (
    <div className="shadow-xl w-[20rem] h-[14rem] rounded bg-blue-200 fixed right-8 text-black">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className='flex justify-center'>
        <p className="font-extrabold text-blue-900">Notices</p>  </div>
        {notices.map((values,index)=>(
          <div key={index} className="w-[90%] mx-4 px-4  flex ">
          <p className='text-blue-900 text-lg p-2'><FaHandPointRight/></p>
          <div>
          <p className='font-bold text-sm'>{values.notice_for}</p>
          <p className="text-xs">{values.notice_data}</p>
          </div>
        
        </div>
        ))}
        
        
        <button onClick={()=>navigate('/dashboard/notice')} className="p-1 text-xs absolute bottom-1 rounded text-blue-900 font-bold  mt-1 px-2">
          view all
        </button>
      </div>
    </div>
  );
}

function Suggestedforums() {
  const data = [
    {title:"Wrc Bctians",description:"Lets discuss bct guys of all batches.Welcome to the community",members:232},
    {title:"Lamachaur",description:"Guys living in lamachaur are welcome",members:122},
    {title:"TU Students",description:"We welcome all the TU students across Nepal to our forums",members:"1.1k"}
  ]
  return (
    <div className="shadow-xl w-[20rem] h-[14rem] rounded bg-[var(--primarycolor)] absolute bottom-8 right-8 text-black">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className='flex'>
          <p className="font-extrabold text-blue-900">Suggested for you</p>
         
        </div>
        
        {data.map((values,index)=>(
          <div key={index} className="w-full mx-4 px-4 shadow-md">
          <div className='flex'>
          <p>{values.title}</p> <p className="text-xs  mt-1 ml-4 text-blue-900">{values.members}members</p> 
          <button className="bg-blue-900 text-white  p-1 text-xs absolute  mb-2 right-2 mt-1 px-2">
              join
            </button>
            </div> 
            <p className="text-xs w-60">
              {values.description}
            </p>
          </div>
      ))}
      </div>
    </div>
  );
}

function Rightbar() {
  return (
    <div className="flex flex-col gap-4">
      <Notice />
      <Suggestedforums />
    </div>
  );
}

export default Rightbar;
