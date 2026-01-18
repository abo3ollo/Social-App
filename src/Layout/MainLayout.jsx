
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Sidebar from '../Components/Sidebar/Sidebar'
import RightSidebar from '../Components/Sidebar/RightSidebar'


export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className=' bg-gray-100 min-h-screen  dark:bg-black dark:text-white'>
        <div className='container w-[90%] mx-auto'>
          <div className='flex flex-wrap'>
            <div className="w-1/4 pt-5 hidden xl:block ">
              <Sidebar />
            </div>
            <div className='w-full mx-auto pt-5 space-y-3 xl:w-2/4 '>
              <Outlet />
            </div>
            <div className="w-1/4 mx-auto pt-5 space-y-3 hidden xl:block">
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>
      {/* <Footer/> */}
    </>
  )
}
