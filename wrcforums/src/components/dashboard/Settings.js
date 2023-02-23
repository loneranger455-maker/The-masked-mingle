import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
function Settings() {
  return (
    <div className='flex'>
    <Sidebar value="settings" />
    <div  className='w-4/5'>
    <Topbar/>
    <div className='w-full h-full justify-center align-middle'>
      <div>

      </div>

    </div>
    </div>
   
</div>
  )
}

export default Settings