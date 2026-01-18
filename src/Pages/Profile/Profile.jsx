import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import UserPosts from '../../Components/UserPosts/UserPosts'
import UploadUserPhoto from '../../Components/UploadUserPhoto/UploadUserPhoto'

export default function Profile() {


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
      <div className='bg-violet-600 italic p-2 lg:w-full   mx-auto space-y-2 text-white rounded-3xl text-center'>
        <img src={data?.photo} className='size-12.5 rounded-full mx-auto' alt="" />
        <p className='text-2xl mb-3  '>Name: {data?.name}</p>
        <p className='text-2xl mb-3 '>Email: {data?.email}</p>
        <p className='text-2xl mb-3 '>Gender: {data?.gender}</p>
        <p className='text-2xl mb-3 '>Date Of Birth: {data?.dateOfBirth}</p>

        <UploadUserPhoto/>


      </div>
      <UserPosts userId = {data?._id}/>
    </>
  )
}
