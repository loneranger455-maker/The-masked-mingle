import React, { useState,useEffect } from "react";
import axios from "axios";
import { GetToken } from "../../../services/Localstorageservice";
import { useNavigate } from "react-router";

function Createpost() {
    const [joinedforums,setJoinedForums]=useState([])
    const navigate=useNavigate()
    const {access}=GetToken()
    useEffect(()=>{

    
      axios.get('http://127.0.0.1:8000/api/user/joinedforums/',{headers:{
        "authorization":`Bearer ${access}`
      }}).then((response)=>{
      console.log(response)
      setJoinedForums(response.data)}
      )
      .catch((err)=>console.log(err))
  },[])

  const Handlesubmit=(e)=>{
    e.preventDefault()
    const formdata=new FormData(e.target)

    axios.post('http://127.0.0.1:8000/api/user/allposts/',formdata,{headers:{
        "authorization":`Bearer ${access}`
      }}).then((response)=>{
      console.log(response)
      navigate('/dashboard/activities')
      }
      )
      .catch((err)=>console.log(err))

  }

  return (
    <div className="ml-20 mt-8 h-[30rem] overflow-scroll" >
      <form class="w-full max-w-xl flex flex-col gap-6" onSubmit={Handlesubmit}>
        <select name="forum"
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Select a forum</option>
         {joinedforums.length >= 1? joinedforums.map((values, index) => (
            <option key={index} value={values}>
              {values}
            </option>
          )):""}
        </select>
        <div>
        <label for='title'  className='text-sm'>Enter the title</label>

        <input id='title' type='text' name="title" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='enter the title here' required/>

        </div>
        <div>
        <label for='textarea' className='text-sm'>Enter the content</label>
        <textarea id="textarea" name="contentvalue" className="h-[20rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 >      </textarea>
        </div>
        <div>
        <input type='text' name="link" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='post a link(Optional)' optional/>

        </div>
        <div className='flex w-full justify-between'>
            <div className='w-[10rem] bg-[var(--secondarycolor)] flex justify-around border rounded p-2.5 border-gray-300'>
            <input id='discussion' type='radio' name='post_type'/ >
            <label for='discussion'>Discussion</label> 
            </div>
            <div className='w-[10rem] bg-[var(--secondarycolor)]  flex justify-around border rounded p-2.5 border-gray-300'>
            <input id='question' type='radio' name='post_type'/ >
            <label for='question'>Question</label> 
            </div>
            <div className='w-[10rem] bg-[var(--secondarycolor)]  flex justify-around border rounded p-2.5 border-gray-300'>
            <input id='notice' type='radio' name='post_type'/ >
            <label for='notice'>Notice</label> 
            </div>
            
        </div>
        <div className='text-center'>
            <input type='submit' value='submit' className='bg-[var(--primarycolor)] p-2.5 px-3.5 rounded'/>
        </div>
      </form>
    </div>
    
  );
}

export default Createpost;
