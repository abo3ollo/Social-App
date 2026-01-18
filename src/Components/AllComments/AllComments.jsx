import { Divider } from '@heroui/react'
import React from 'react'

export default function AllComments({ comment }) {
    return (
        <div className="px-4 py-3 dark:text-white dark:bg-black">
            <div className="flex items-center gap-3 mb-3  dark:text-white dark:bg-black ">
                <img
                    src={comment?.commentCreator?.photo.includes("/undefined") ? 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80' : comment?.commentCreator?.photo}
                    alt={comment?.commentCreator?.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 bg-gray-100 px-4 py-3 rounded-2xl  dark:text-white dark:bg-black">
                    <h4 className="font-semibold text-gray-900 text-sm  dark:text-white dark:bg-black">{comment?.commentCreator?.name}</h4>
                    <p className="text-sm text-gray-600 mt-1  dark:text-white dark:bg-black">
                        {comment?.content}
                    </p>
                </div>
            </div>
                    <Divider />

            {/* <button onClick={onOpen} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mx-auto cursor-pointer">
                        View all comments
                        <IoChevronDown size={16} />
                    </button> */}
            {/* <PostComments isOpen={isOpen} onOpenChange={onOpenChange} /> */}
        </div>
    )
}
