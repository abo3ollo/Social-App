import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded, BiShare } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function CardBody({ post }) {
    return (
        <>
            <div className="px-4 pb-5 dark:text-white dark:bg-[#18181b]">
                <p className="text-gray-700 dark:text-white ">{post.body}</p>
            </div>

            {/* Post Image */}

            <Link to={`/postdetails/${post._id}`}>
                {post.image && (
                    <div className="w-full">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                )}
            </Link>


            {/* Post Actions */}
                        <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-200 dark:text-white dark:bg-[#18181b]">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors dark:text-white dark:bg-[#18181b]">
                                <AiOutlineHeart size={22} />
                                <span className="text-sm font-medium">1200</span>
                            </button>
                            <button  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors dark:text-white dark:bg-[#18181b]">
                                <BiMessageRounded size={22} />
                                <span className="text-sm font-medium">{post.comments.length}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors dark:text-white dark:bg-[#18181b]">
                                <BiShare size={22} />
                                <span className="text-sm font-medium">17</span>
                            </button>
                        </div>

        </>
    )
}
