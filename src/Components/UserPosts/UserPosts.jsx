import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import PostCard from '../PostsCard/PostCard';

export default function UserPosts({ userId }) {
  console.log(userId);

  async function getUserPosts() {

    return await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }
  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
    select: (data) => {
      return data.data.posts
    }
  })
  console.log(data);


  return (
    <>
      {data?.map((post, index) => {
        return <>
         <PostCard key={index} post={post} />
         
        </>
        
      })}
    </>
  )
}

