import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserPosts from '../../Components/UserPosts/UserPosts'
import UploadUserPhoto from '../../Components/UploadUserPhoto/UploadUserPhoto'
import { RiMvAiLine } from 'react-icons/ri'
import { BiCalendar, BiEdit, BiLock, BiUser, BiUserCircle } from 'react-icons/bi'
import { Divider, useDisclosure } from '@heroui/react'
import UpdatePassword from '../../Components/UpdatePassword/UpdatePassword'
import { Helmet } from 'react-helmet'

export default function Profile() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();





  function getUserInfo() {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })

  }
  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: getUserInfo,
    select: (data) => {
      return data?.data?.user
    }
  })

  console.log(data);



  return (
    <>
      <Helmet>
        <title>Profile - ConnecSo</title>
      </Helmet>

      <div className=" bg-linear-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-8 mb-0">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-r from-blue-500 to-pink-500"></div>
            <div className="relative flex items-center gap-4 mt-8">
              <div onClick={onOpen} className=" relative w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white group cursor-pointer overflow-hidden">
                <img
                  src={data?.photo}
                  className='rounded-full w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-60'
                  alt="Profile"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                    <BiEdit className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className='flex justify-between  items-center  w-[80%] mt-12'>
                <div className="flex-1 ">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{data?.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <RiMvAiLine className="w-4 h-4" />
                    <span className="text-sm dark:text-gray-500">{data?.email}</span>
                  </div>
                </div>
                <span className= " hidden bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium md:flex items-center gap-2">
                  <BiUser className="w-4 h-4" />
                  {data?.gender}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BiUserCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Profile Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your personal details</p>
                </div>
              </div>
              <Divider />

              <div className="space-y-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <BiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Name</p>
                    <p className="text-gray-800 dark:text-white font-medium">{data?.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                    <RiMvAiLine className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Email Address</p>
                    <p className="text-gray-800 dark:text-white font-medium">{data?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0">
                    <BiCalendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Date of Birth</p>
                    <p className="text-gray-800 dark:text-white font-medium">{data?.dateOfBirth}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/30 rounded-full flex items-center justify-center  ">
                    <BiUserCircle className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 dark:text-gray-400">Gender</p>
                    <p className="text-gray-800 font-medium dark:text-white">{data?.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <UpdatePassword />
          </div>
        </div>
      </div>
      <UserPosts userId={data?._id} />
      <UploadUserPhoto isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
