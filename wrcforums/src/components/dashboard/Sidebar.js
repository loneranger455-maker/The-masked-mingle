import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AiFillHome } from 'react-icons/ai'
import { IoSearchCircle } from 'react-icons/io5'
import {HiSpeakerphone} from 'react-icons/hi'
import {AiFillProfile} from 'react-icons/ai'
import {IoSettings} from 'react-icons/io5'
function Sidebar(props) {
  const [colors,setColor]=useState({
    home:'',
    notice:'',
    findforums:'',
    activities:'',
    settings:''
  })
  const setvalue=()=>{
    setColor({...colors,[props.value]:"var(--primarycolor)"})
  }
  const navigate=useNavigate()
  useEffect(()=>{setvalue()
    }
    ,[])
 
  
  return (
    <div className='w-1/5 h-screen '>
<div className='w-1/5 h-screen  fixed  shadow-xl mix-blend-multiply hover:mix-blend-overlay" shadow-black'>
           
            <div className='flex flex-col justify-center items-center pt-8'>
                <div>
                  <img className='w-28 h-28 rounded-full' src={require('../../assets/user1.jpg')} alt='user'/>
                </div>
                <div>
                    <p className='font-extrabold'>Loneranger</p>
                </div>
                <div>
                  <p className='text-green-800 text-[10px]'>Modify profile</p>
                </div>
            </div>
            <div className='flex flex-col items-center mt-10 gap-2'>
              <button onClick={()=>navigate('/dashboard')} style={{backgroundColor:`${colors.home}`}} className='shadow-md  p-3 w-[90%] rounded-full text-center flex gap-10 align-middle hover:justify-between px-10'><div className='p-1 bg-[#28ffdb] rounded-full text-lg'><AiFillHome/></div>Home</button>
              <button onClick={()=>navigate('/dashboard/findforums')} style={{backgroundColor:`${colors.findforums}`}} className='shadow-md  p-3 w-[90%] rounded-full text-center flex gap-10 align-middle hover:justify-between px-8'><div className='p-1 bg-[#28ffdb] rounded-full text-lg'><IoSearchCircle/></div>Find Forums</button>
              <button onClick={()=>navigate('/dashboard/notice')} style={{backgroundColor:`${colors.notice}`}} className='shadow-md  p-3 w-[90%] rounded-full text-center flex gap-10 align-middle hover:justify-between px-10'><div className='p-1 bg-[#28ffdb] rounded-full text-lg'><HiSpeakerphone/></div>Notices</button>
              <button onClick={()=>navigate('/dashboard/activities')} style={{backgroundColor:`${colors.activities}`}} className='shadow-md  p-3 w-[90%] rounded-full text-center flex gap-10 align-middle hover:justify-between px-10'><div className='p-1 bg-[#28ffdb] rounded-full text-lg'><AiFillProfile/></div>Profile</button>
              <button onClick={()=>navigate('/dashboard/settings')} style={{backgroundColor:`${colors.settings}`}} className='shadow-md  p-3 w-[90%] rounded-full text-center flex gap-10 align-middle hover:justify-between px-10'><div className='p-1 bg-[#28ffdb] rounded-full text-lg'><IoSettings/></div>Settings</button>

            </div>
            

        </div> 
        </div>
    )
}

export default Sidebar