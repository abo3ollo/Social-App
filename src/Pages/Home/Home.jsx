import React, { useContext, useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { PostContext } from '../../Context/PostContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import PostCard from '../../Components/PostsCard/PostCard'
import Loading from '../../Components/loading/Loading'
import PostComment from '../PostDetails/PostDetails'
import PostDetails from '../PostDetails/PostDetails'
import CreatePost from '../../Components/CreatePost/CreatePost'

export default function Home() {

  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })

  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts
  })
  console.log(data?.data?.posts);

  if (isLoading) {
    return (
      <>
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </>
    )

  }

  if (isError) {
    return <h3>{error.message}</h3>
  }



  return (
    <>
      <CreatePost/>
      {data?.data?.posts.map((post, index) => {
        return <PostCard key={index} post={post} />
      })}
    </>
  )
}
