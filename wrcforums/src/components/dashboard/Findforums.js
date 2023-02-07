import React from 'react'
import { useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import {AiFillLock} from 'react-icons/ai'
import {AiFillUnlock} from 'react-icons/ai'

function Noticerightbar(){
    const values=["WRC Bctians","Share Bazar","Pokhara","Lamachaur","Bikes in Nepal"]
    return(
      <div className=' absolute top-[10rem] right-10 h-[25rem] w-[20rem] bg-[var(--secondarycolor)]'>
        <div className='p-5 flex flex-col gap-4'>
        
        <div className="flex items-center p-2.5 border-2 border-gray-300 rounded shadow">
    <input id="unchecked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show open forums only</label>
</div>
<div className='flex items-center p-2.5 border-2 border-gray-300 rounded shadow'>
    <div>
    <h1>Filter by</h1>
    <p className='text-sm'>Members</p>
    </div>
    
    <div className='flex w-10 justify-between'>

    </div>
    

</div>
  
        </div>
        
      </div>
    )
  }
  

function Findforums() {
    const forums=[
        {title:"Wrc Bctians",description:"Lets discuss bct guys of all batches.Welcome to the community",members:232,open:true},
        {title:"Lamachaur",description:"Guys living in lamachaur are welcome",members:122,open:false},
        {title:"TU Students",description:"We welcome all the TU students across Nepal to our forums",members:"1.1k",open:true}
]
const navigate=useNavigate()
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

      
        <div className='flex flex-col m-8 max-w-xl gap-4 overflow-scroll h-[28rem]'>
{
    forums.map((value,index)=>(
        <div key={index} class="flex bg-white shadow-lg w-full h-[60%] gap-4 ">
        <div>
            <img src={require('../../assets/demo.png')} alt='demo' className='h-2/3'/>
        </div>
        <div className='flex flex-col relative '>
            <div className='flex'>
            <h1 className='font-extrabold'>{value.title} </h1>
            {value.open?
            <p className='text-blue-900'> <AiFillUnlock/></p>:
            <p className='text-red-900'> <AiFillLock/></p>
            }
            </div>
            
            <h3 className='font-light text-md'>{value.description}</h3>
            <div className='absolute bottom-4 flex  justify-between w-[27rem]'>
                <h3 className='font-light text-sm  text-blue-900'>{value.members} members</h3>
                <div>
                    <button className='bg-white  shadow-xl flex text-sm'>
                        {value.open?<p className='bg-[var(--primarycolor)] px-2 py-0.5 rounded'>Join</p>:<p className='bg-red-800 text-white px-2 py-1 rounded'>Request to join</p>}
                        </button>
                </div>
            </div>
        </div>

</div>
    ))
}
      </div>
<Noticerightbar/>
      

    </div>
</div>
    </div>
  )
}

export default Findforums