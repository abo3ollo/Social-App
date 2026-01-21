
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import PostCard from '../../Components/PostsCard/PostCard'
import Loading from '../../Components/loading/Loading'

import CreatePost from '../../Components/CreatePost/CreatePost'
import { Helmet } from 'react-helmet'

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
    queryFn: getAllPosts,
    select: (data) => {
      return data.data.posts
    }
  })
  console.log(data);

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
      <Helmet>
        <title> ConnecSo</title>
      </Helmet>
      
      <CreatePost />
      {data?.map((post, index) => {
        return <PostCard key={index} post={post} />
      })}
    </>
  )
}
