import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function Sidebar(props) {
  const [colors,setColor]=useState({
    home:'',
    notice:'',
    findforums:'',
    activities:'',
    settings:''
  })
  const setvalue=()=>{
    setColor({...colors,[props.value]:"#DC143C"})
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
              <button onClick={()=>navigate('/dashboard')} style={{color:`${colors.home}`}} className='shadow-md  p-4 w-[90%] text-center'>Home</button>
              <button onClick={()=>navigate('/dashboard/findforums')} style={{color:`${colors.findforums}`}} className='shadow-md  p-4 w-[90%] text-center'>Find Forums</button>
              <button onClick={()=>navigate('/dashboard/notice')} style={{color:`${colors.notice}`}} className='shadow-md  p-4 w-[90%] text-center'>Notices</button>
              <button onClick={()=>navigate('/dashboard/activities')} style={{color:`${colors.activities}`}} className='shadow-md  p-4 w-[90%] text-center'>Profile</button>

            </div>
            

        </div> 
        </div>
    )
}

export default Sidebar