import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GetToken, GetUserId } from '../../services/Localstorageservice'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import axios from 'axios'
import {AiFillDelete} from 'react-icons/ai'

function AddComment(props){
  const [comment,setComment]=useState()
  const handleSubmit=(e)=>{
    e.preventDefault()
    setComment("")
  const {access}=GetToken()
const formdata=new FormData(e.target)
axios.post('http://127.0.0.1:8000/api/user/addcomment/'+props.id+"/",formdata,{headers:{
        "authorization":`Bearer ${access}`
      }}).then((response)=>{
      props.setData(response.data)
      }
      )
      .catch((err)=>console.log(err))
  }
  return(
    <div class="w-[30rem] rounded-lg shadow-md shadow-blue-600/50">
    <form action="" class="w-full p-4" onSubmit={handleSubmit}>
      <div class="mb-2">
        <label for="comment" class="text-lg text-gray-600">Add a comment</label>
        <textarea
          value={comment} onChange={(e)=>setComment(e.target.value)}
          class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
          name="comment"
          placeholder=""></textarea>
      </div>
      <div className="flex justify-between">
        <input type='submit' value='comment' class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"/>
          
      
        
      </div>
    </form>
  </div>
  )
}


function Comments(props){
  const user_id=GetUserId()
  return(
    <div class="max-w-lg rounded-lg relative">
      <div className='flex gap-2'>
        <div className=' p-1 '>     
           <img className='w-[3rem] rounded-full' src={`http://127.0.0.1:8000/media/${props.comment[2]}`}/>
           

</div>
        <div className='flex  flex-col gap-1 w-full py-2 px-4 bg-[#F0F2F5] rounded-xl'>
        <p className='text-black font-medium rounded text-lg'>{props.comment[0]}</p>
              <p className='text-md text-slate-800' >{props.comment[1]}</p>
              {user_id==props.user_id?<p className='absolute right-4 top-4'><AiFillDelete/></p>:""}
        </div>
      
      </div>
    
  </div>
  )
}

function Postdetails() {
  const {access}=GetToken()
  const {id}=useParams()
  const [data,setData]=useState({title:"wasting so much money",link:"www.google.com",contentvalue:"this is just a demo writing",comments:['cmnt1','cmnt2','cmnt3']})
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/user/posts/'+id,{headers:{
        "authorization":`Bearer ${access}`
      }}).then((response)=>{
      console.log(response.data)
      setData(response.data)
      }
      )
      .catch((err)=>console.log(err))
  },[])
  return (
    <div className='flex overflow-hidden'>
      <Sidebar/>
      <div className='w-4/5'  >
        <Topbar/>
          <div className='w-3/5 box-content flex flex-col items-center gap-10 mt-20 '>
      
        
          <div className='flex flex-col'>
            <div className='w-[30rem] flex flex-col gap-4'>
            <p className='font-bold text-xl'>{data.title}</p>
            <p>{data.contentvalue}</p>
            <p><a className='text-blue-700 hover:underline' target="_blank" href={data.link}>{data.link}</a></p>
            <div class="flex width-full justify-between border-t border-gray-300  text-gray-600">
    <header className='flex'><p>Posted by:</p><strong>{data.username}</strong></header>
    

  </div>
            </div>
            

            </div>
            <div className='w-[30rem] flex flex-col gap-5'>
            {data.comments.map((cmnt)=>
            <Comments comment={cmnt} user_id={data.posted_by_id}/>
            )}
            </div>
         
         
        
      
      <AddComment id={id} setData={setData} />
    </div>
    </div>
    </div>

  )
}

export default Postdetails