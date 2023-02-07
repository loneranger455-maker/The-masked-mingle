import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import {BiLike} from 'react-icons/bi'

function Noticerightbar(){
  const values=["WRC Bctians","Share Bazar","Pokhara","Lamachaur","Bikes in Nepal"]
  return(
    <div className=' absolute top-[10rem] right-10 h-[25rem] w-[20rem] bg-[var(--secondarycolor)]'>
      <div className='p-5'>
      
<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter by Forums</label>
<select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>All Forums</option>
  {values.map((values,index)=>(
  <option key={index} value={values}>{values}</option>
  ))}
</select>

      </div>
      
    </div>
  )
}

function Notices() {
  const noticesbox=[
    {forum:"WRC Bcitians",notice:"Guys voli bida  hai",like:20,posted:"25 min ago"},
    {forum:"Stock Market",notice:"Nepse increased by 1.5 today",like:20,posted:"25 min ago"},
    {forum:"Prices in Pokhara",notice:"Price hike coming soon guys.Be ready to witness the biggest price hike of the year",like:20,posted:"25 min ago"},
    {forum:"Pokhara",notice:"Sajan raj baidya new song is out.Check it out",like:20,posted:"25 min ago",link:"https://www.youtube.com/watch?v=6FEsFvZ-hqY"}


  ]

  return (
    <div className='flex'>
        <Sidebar value="notice" />
        <div  className='w-4/5'>
        <Topbar/>
        <div className='mt-8 max-w-4xl ml-[5rem] overflow-scroll h-[33rem] '>
          <div className='w-2/3'>
          <p className='font-extrabold text-blue-900 text-center'>Notices</p>
          <div className='flex flex-col gap-8 mt-8 items-center'>

            {noticesbox.map((noticebox,index)=>(
                <div className="w-full px-6 h-max" key={index}>
                    <p className='font-extrabold px-4'>{noticebox.forum}</p>
                    <p className='px-4'>{noticebox.notice}</p>
                    <a href={noticebox.link} target='_blank' className='px-4 text-blue-900'> {noticebox.link}</a>
                    <div className='border-2 flex justify-between px-8'>
                     <span className='flex text-blue-800'><BiLike/> <span className='text-sm'>{noticebox.like}</span></span> {noticebox.posted}
                    </div>
                </div>
            ))}
          </div>
          </div>
         <Noticerightbar/>
        </div>
        </div>
       
    </div>
  )
}

export default Notices