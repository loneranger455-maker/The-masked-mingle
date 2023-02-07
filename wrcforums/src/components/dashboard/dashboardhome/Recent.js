import React from 'react'
import {BiLike} from 'react-icons/bi'
import {BiComment} from 'react-icons/bi'
function Demo(){
    return(
        <div class="flex ">
        <div class="block w-[35rem] ml-[5rem] rounded-lg bg-white  shadow-lg hover:bg-[var(--secondarycolor)] cursor-default">
          <div class="p-6">
            <p className='text-xs'>Lamachaur</p>
            <h5 class="mb-2 text-xl font-bold text-gray-900">Any rooms in lamachaur?</h5>
            <p class="mb-4 text-base text-gray-700 ">Need a room for 2 engineering students (boys) of first semester</p>
            <div className='flex w-[5rem] justify-between'>
              <div className='flex '><BiLike/><span className='text-sm'>24</span></div>
              <div className='flex '><BiComment/><span className='text-sm'>4</span></div>

            </div>
          
          </div>
          <div class="flex width-full justify-between border-t border-gray-300 px-6 text-gray-600">
            <header className='flex'><p>Posted by:</p><strong>Anonomous_ghost</strong></header>
            <p>2 days ago</p>
        
          </div>
        </div>
        </div>
    )
}
function Recent() {
 return (
    <div className='flex flex-col h-[30rem] gap-6  mt-2 w-2/3'>
   <Demo/>
   <Demo/>
   <Demo/>
   <Demo/>
   <Demo/>
   <Demo/>
   

</div>
  )
}

export default Recent