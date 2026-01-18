import {Card, Divider, Input, useDisclosure} from "@heroui/react";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";



import { HiPhoto } from "react-icons/hi2";
import CreatePostModal from "./CreatePostModal";





export default function CreatePost() {

      const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
  return (
    <>
        <Card >
        
        <div className=" flex items-center gap-2 p-4 ">
            <div>
                <img  src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80' className="w-12.5 rounded-full" alt="" />
            </div>
            <Input onClick={onOpen} isReadOnly placeholder="what's on your mind ?" type="text" />
        </div>
        <Divider />
        <div className="flex items-center justify-evenly p-5  ">
            <div className="flex items-center cursor-pointer ">   
                <BsCameraVideoFill className=" text-orange-400 text-3xl mx-1.5"/>
                <p className=" font-medium text-sm">Go Live</p>
            </div>
            <div className="flex items-center cursor-pointer ">   
                <HiPhoto className=" text-green-800 text-3xl mx-1.5"/>
                <p className=" font-medium text-sm">Photo</p>
            </div>
            <div className="flex items-center cursor-pointer ">   
                <PiVideoFill className=" text-pink-400 text-3xl mx-1.5"/>
                <p className=" font-medium text-sm">Video</p>
            </div>
            <div className="flex items-center cursor-pointer ">   
                <MdEmojiEmotions  className=" text-blue-400 text-3xl mx-1.5"/>
                <p className=" font-medium text-sm">Feeling</p>
            </div>
        </div>
    
        </Card>
        <CreatePostModal isOpen={isOpen} onOpenChange={onOpenChange}/>

    </>

    
  );
}

// CreatePost