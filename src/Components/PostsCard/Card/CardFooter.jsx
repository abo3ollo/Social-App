import React from 'react'
import { BiImage, BiMessageRounded, BiShare } from 'react-icons/bi'
import { IoChevronDown } from 'react-icons/io5'
import { MdOutlineEmojiEmotions } from 'react-icons/md'

import { useDisclosure } from '@heroui/react';


import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import CreateCommentsModal from '../../CreateCommentsModal/CreateCommentsModal';


export default function CardFooter({ post }) {


    const { isOpen, onOpen, onOpenChange  } = useDisclosure();

    return (
        <>
            

            <div className="px-4 py-3 border-b border-gray-200 dark:text-white dark:bg-[#18181b]">
                <div className="flex items-center gap-3">

                    <input
                        type="text"
                        placeholder="Write your comment"
                        className="  dark:placeholder:text-white dark:text-white dark:bg-gray-700 flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={onOpen}
                    />
                    <CreateCommentsModal postId={post._id} isOpen={isOpen} onOpenChange={onOpenChange} />

                    <button className="text-gray-500 hover:text-gray-600">
                        <BiImage size={22} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                        <MdOutlineEmojiEmotions size={22} />
                    </button>
                </div>
            </div>


            {/* Comments Section */}
            <div className="px-4 py-3 dark:text-white dark:bg-[#18181b]">
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={post?.comments[0]?.commentCreator?.photo.includes("/undefined") ? 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80' : post?.comments[0]?.commentCreator?.photo}
                        alt={post?.comments[0]?.commentCreator?.name}
                        className="w-10 h-10 rounded-full object-cover  dark:text-white dark:bg-[#18181b]"
                    />
                    <div className="flex-1 bg-gray-50 px-4 py-3 rounded-2xl dark:text-white dark:bg-[#18181b]">
                        <h4 className="font-semibold text-gray-900 text-sm dark:text-white dark:bg-[#18181b]">{post?.comments[0]?.commentCreator?.name}</h4>
                        <p className="text-sm text-gray-600 mt-1 dark:text-amber-50 dark:bg-[#18181b]">
                            {post?.comments[0]?.content}
                        </p>
                    </div>
                </div>

                
                    <button  className=" dark:text-white dark:bg-[#18181b] dark:hover:text-white flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mx-auto cursor-pointer">
                        View all comments
                        <IoChevronDown size={16} />
                    </button>
            </div>
        </>
    )
}
