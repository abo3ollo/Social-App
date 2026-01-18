import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function CardHeader({post}) {
    return (
        <div className="flex items-center justify-between dark:rounded-t-3xl  p-4 dark:text-white dark:bg-[#18181b]">
            <div className="flex items-center gap-3 dark:text-white dark:bg-[#18181b]">
                <img
                    src={post.user.photo || 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white dark:bg-[#18181b]">{post.user.name}</h3>
                    {/* <p className="text-sm text-gray-500">{post.createdAt.split(".").slice(0,1).join("").replace("T" , " ")}</p> */}
                    <p className="text-sm text-gray-500 dark:text-white dark:bg-[#18181b]">{new Date(post.createdAt).toLocaleString("en-us", { dateStyle: "full", timeStyle: "short" })}</p>
                </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white">
                <BsThreeDotsVertical size={20} />
            </button>
        </div>
    )
}
