import { Badge, Card, Divider, Input, useDisclosure } from "@heroui/react";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";
import { HiPhoto } from "react-icons/hi2";
import CreatePostModal from "./CreatePostModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CreatePost() {
    function getUserInfo() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        });
    }
    let { data, error, isError, isLoading } = useQuery({
        queryKey: ["UserInfo"],
        queryFn: getUserInfo,
        select: (data) => {
            return data.data.user;
        },
    });

    console.log(data);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card>
                <div className=" flex items-center gap-2 p-4 ">
                    <div>
                        <Badge color="success" content="" placement="bottom-right" shape="circle">

                            <img src={data?.photo} className="w-12.5 rounded-full" alt="" />
                        </Badge>
                    </div>
                    <Input
                        onClick={onOpen}
                        isReadOnly
                        placeholder="what's on your mind ?"
                        type="text"
                    />
                </div>
                <Divider />
                <div className="flex items-center justify-evenly p-5  ">
                    <div className="flex items-center cursor-pointer ">
                        <BsCameraVideoFill className=" text-orange-400 text-3xl mx-1.5" />
                        <p className=" font-medium text-sm">Live</p>
                    </div>
                    <div className="flex items-center cursor-pointer ">
                        <HiPhoto className=" text-green-800 text-3xl mx-1.5" />
                        <p className=" font-medium text-sm">Photo</p>
                    </div>
                    <div className="flex items-center cursor-pointer ">
                        <PiVideoFill className=" text-pink-400 text-3xl mx-1.5" />
                        <p className=" font-medium text-sm">Video</p>
                    </div>
                    <div className="flex items-center cursor-pointer ">
                        <MdEmojiEmotions className=" text-blue-400 text-3xl mx-1.5" />
                        <p className=" font-medium text-sm">Feeling</p>
                    </div>
                </div>
            </Card>
            <CreatePostModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}
