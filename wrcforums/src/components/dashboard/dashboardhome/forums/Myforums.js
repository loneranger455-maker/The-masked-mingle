import React from 'react'
import { useNavigate } from 'react-router'
import {TbEdit} from 'react-icons/tb'

function Myforums() {
    const navigate=useNavigate()
    const forums=[
        {title:"Wrc Bctians",description:"Lets discuss bct guys of all batches.Welcome to the community",members:232},
        {title:"Lamachaur",description:"Guys living in lamachaur are welcome",members:122},
        {title:"TU Students",description:"We welcome all the TU students across Nepal to our forums",members:"1.1k"}
]
  return (
    <div className='flex flex-col  mt-6 ml-[4rem]'>
      <div className='max-w-xl flex'>
        <button onClick={()=>navigate('/dashboard/forum')} className='w-1/2 bg-[var(--secondarycolor)] p-2'>Joined Forums</button>
        <button onClick={()=>navigate('/dashboard/forum/myforums')} className='w-1/2 bg-[var(--primarycolor)] p-2'>My Forums</button>
        </div>
        <div className='flex flex-col m-8 max-w-xl gap-4 overflow-scroll h-[24rem]'>
{
    forums.map((value,index)=>(
        <div key={index} class="flex bg-white shadow-lg w-full h-[60%] gap-4 ">
        <div>
            <img src={require('../../../../assets/demo.png')} alt='demo' className='h-2/3'/>
        </div>
        <div className='flex flex-col relative '>
            <h1 className='font-extrabold'>{value.title}</h1>
            <h3 className='font-light text-md'>{value.description}</h3>
            <div className='absolute bottom-4 flex  justify-between w-[27rem]'>
                <h3 className='font-light text-sm  text-blue-900'>{value.members} members</h3>
                <div>
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