import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    RadioGroup,
    Radio,
    Divider,
} from "@heroui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/PostsCard/PostCard";
import CardHeader from "../../Components/PostsCard/Card/CardHeader";
import CardBody from "../../Components/PostsCard/Card/CardBody";
import CardFooter from "../../Components/PostsCard/Card/CardFooter";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IoChevronDown } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BiImage, BiMessageRounded, BiShare } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import Loading from "../../Components/loading/Loading";
import Sidebar from "../../Components/Sidebar/Sidebar";

import AllComments from "../../Components/AllComments/AllComments";

export default function PostDetails({ isOpen, onOpenChange }) {

    let { id } = useParams()
    // console.log(id);

    // axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
    //     headers: {
    //         token : localStorage.getItem("userToken")
    //     }
    // }).then((res) => {
    //     console.log(res);

    // }).catch((err)=>{
    //     console.log(err);

    // })

    function getSinglePost() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })


    }

    let { data, isLoading, isError, error } = useQuery({
        queryKey: ["singlePost"],
        queryFn: getSinglePost,
        select: function (data) {
            return data.data.post

        }
    })
    console.log(data);


    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    }



    return (

        <div>
            <h2>Details bta3t el post</h2>
            <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto mb-4 dark:text-white dark:bg-black">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={data?.user?.photo || 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'}
                            alt={data?.user?.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white dark:bg-black">{data?.user?.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-white dark:bg-black">{new Date(data?.createdAt).toLocaleString("en-us", { dateStyle: "full", timeStyle: "short" })}</p>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white">
                        <BsThreeDotsVertical size={20} />
                    </button>
                </div>
                <div className="px-4 pb-3 dark:text-white dark:bg-black">
                    <p className="text-gray-700 dark:text-white dark:bg-black">{data?.body}</p>
                </div>




                {data?.image && (
                    <div className="w-full">
                        <img
                            src={data?.image}
                            alt="post content"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                )}



                <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-200 ">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors dark:text-white dark:bg-black">
                        <AiOutlineHeart size={22} />
                        <span className="text-sm font-medium">1200</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors dark:text-white dark:bg-black">
                        <BiMessageRounded size={22} />
                        <span className="text-sm font-medium ">{data?.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors dark:text-white dark:bg-black">
                        <BiShare size={22} />
                        <span className="text-sm font-medium ">17</span>
                    </button>
                </div>
                <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Write your comment"
                            className=" dark:placeholder:text-white dark:text-white dark:bg-gray-700 flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="text-gray-400 hover:text-gray-600">
                            <BiImage size={22} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MdOutlineEmojiEmotions size={22} />
                        </button>
                    </div>
                </div>


                {data.comments.map((com) => {
                    return (
                        <AllComments comment={com}  />
                    )
                })}

            </div>


        </div>

    );
}


