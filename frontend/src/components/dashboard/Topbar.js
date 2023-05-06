import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function Topbar() {
  
  return (
    <div className='flex width-screen top-0 '>
         <div className='w-[3rem] h-[3rem] flex ml-10 pt-4'>
            <img src={require('../../assets/logo2.png')} alt='logo'/>
            <p className='font-extrabold text-xl ml-4 mt-1'>StuForum</p>
            </div>
            <div className=' w-full flex justify-end' >
                <Navelements >
                    <div className='z-10 border-[var(--primarycolor)] height-40 border-2 mr-[4rem] bg-slate-100 absolute right-0 h-200 gap-2 flex px-2 flex-col rounded'>
                        <div className='w-40  text-xs'>you have received a Notification1</div>
                        <div className='w-40  text-xs'>you have received a Notification2</div>
                        <div className='w-40  text-xs'>you have received a Notification3</div>
                    </div>
                </Navelements>
    
    </div>        
    </div>
 
  
  )
}
function Navelements(props){
    const [shownotification,setShowNotification]=useState(false)
    const [showuser,setShowUser]=useState(false)
    const navigate=useNavigate()


return(
    <div className='mt-4'>
        <button className='w-6 mr-[2.5rem]' onClick={()=>{setShowNotification(!shownotification)
        setShowUser(false)}}>
            <img src={require('../../assets/icons/notification.ico')} alt='notification'/>
        </button>
      
         
         
         <button className='w-6 mr-[4rem]' onClick={()=>{setShowUser(!showuser)
        setShowNotification(false)
        }} ><img src={require('../../assets/user.png')} alt='user'/></button>


        {showuser?
        <div className='border-[var(--primarycolor)] height-40 border-2 right-[2rem] bg-slate-100 absolute  h-200 gap-2 flex px-2 flex-col rounded'>
            <button>Profile</button>
            <button onClick={()=>navigate('/')}>SignOut</button>

        </div>:""}


        <div >
            {shownotification?props.children:""}
            
        </div>
       
    </div>
)
}

export default Topbar