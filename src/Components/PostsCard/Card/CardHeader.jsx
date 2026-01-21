import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@heroui/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import UpdatePost from '../../UserPosts/UpdatePost';

import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function CardHeader({ post }) {
    // Delete Post

    let queryClient = useQueryClient
    function deletePost(id) {
        console.log(id);
        axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            if (res.data.message === "success") {
                form.reset()
                toast.success("Post Deleted!");

                queryClient.invalidateQueries({
                    queryKey: ["getUserPosts"]
                })
                console.log(res);
            }
        }).catch((err) => {
            toast.error(err?.response?.data?.error || "Failed to DELETE post");
            console.log(err?.response);
        })

    }

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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

            {/* <button className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white">
                <BsThreeDotsVertical size={20} />
            </button> */}

            <Dropdown placement="bottom-end">
                <DropdownTrigger className="cursor-pointer">
                    <button className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white">
                        <BsThreeDotsVertical size={20} />
                    </button>
                </DropdownTrigger  >
                <DropdownMenu aria-label="Profile Actions" variant="flat" >

                    <DropdownItem onClick={onOpen} key="update">Update</DropdownItem>
                    <DropdownItem onPress={() => { deletePost(post?._id) }} key="delete" className="text-danger" color="danger" >
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <UpdatePost isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} postId={post?.id} />



        </div>
    )
}
