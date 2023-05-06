import React, { useState } from 'react'
import { GetToken } from '../../../../services/Localstorageservice'
import Sidebar from '../../Sidebar'
import Topbar from '../../Topbar'
import defaultImage from './forumdefault.png'
import { useNavigate } from 'react-router'
import axios from 'axios'

function CreateForums() {
    const [image,setImage]=useState(defaultImage)
    const navigate=useNavigate()
    const {access}=GetToken()
    const Handlesubmit=(e)=>{
      e.preventDefault()
      const formData=new FormData(e.target)
      const config = {     
        headers: { 'content-type':'multipart/form-data','authorization':`Bearer ${access}` },
        
    }
      formData.append("image",image)
      axios.post('http://127.0.0.1:8000/api/user/createforums/',formData,config).then((response)=>{
          console.log(response.data)
          navigate("")
          }
          )
          .catch((err)=>console.log(err))

    }

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-4/5'>
            <Topbar/>

            <div className='flex m-10 mt-12 border-2 rounded-xl border-slate-300'>
            <form class="w-full flex  gap-6" onSubmit={Handlesubmit}>
                <div className='w-[70%]'>
                <p className='font-extrabold text-bg text-center'>Create Forums</p>
                <div className="ml-16 mt-4 h-[30rem] overflow-scroll flex flex-col gap-4" >
      
     
        <div>
        <label for='title'  className='text-sm'>Enter the Name</label>

        <input id='title' type='text' name="forum_name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='enter the name of forum here' required/>

        </div>
        <div>
        <label for='textarea' className='text-sm'>Enter the description</label>
        <textarea id="textarea" name="description" className="h-[12rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 >      </textarea>
        </div>
       
           
            <div className='w-full  flex justify-around border rounded p-1.5 '>
            <label className='mt-2 text-sm' for='privacy'>Select the Privacy</label>
            <select name="privacy"
          id="privacy"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value='public' selected>Public</option>
          <option value='private'>Private</option>
         
          
        </select>
            </div>
            <div>

        <input  type='submit' name="" className='bg-blue-700  border border-gray-300 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value="submit"/>

        </div>
        </div>
      
                </div>
                <div className='w-[25%] mt-20 border-slate-300 p-4 rounded-lg border-2 flex flex-col items-center h-max'>
                    <img className='w-[10rem]' src={image}></img>
                    <div>

  <label class="block mb-2  mt-4 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
<input name='image' class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" onChange={(e)=>setImage(e.target.value)} type="file"/>
<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                    </div>
                    
                </div>
                
      </form>
   
                
            </div>
        </div>
    </div>
  )
}

export default CreateForums