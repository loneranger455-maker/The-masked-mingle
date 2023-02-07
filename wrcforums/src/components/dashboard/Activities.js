import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Activities() {
  return (
    <div className='flex'>
    <Sidebar value="activities" />
    <div  className='w-4/5'>
    <Topbar/>
    </div>
   
</div>
  )
}

export default Activities