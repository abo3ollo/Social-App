import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthBg from '../assets/images/download.png'

export default function AuthLayout() {
  return (
    <>
      <main>
        <div className='grid grid-cols-3 h-screen'>
          <div className="col-span-1 hidden xl:block ">
            <img src={AuthBg} className=' w-screen h-screen ' alt="" />

          </div>
          <div className="col-span-3 xl:col-span-2 flex justify-center items-center p-10 ">
            <Outlet/>
          </div>
        </div>
      </main>
      
    </>
  )
}
