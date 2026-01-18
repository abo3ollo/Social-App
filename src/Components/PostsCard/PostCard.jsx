import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded, BiShare, BiImage } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { IoChevronDown } from 'react-icons/io5';
import PostComment from '../../Pages/PostDetails/PostDetails';
import CardHeader from './Card/CardHeader';
import CardBody from './Card/CardBody';
import CardFooter from './Card/CardFooter';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        // <Link to={`/postdetails/${post._id}`}>
            
        // </Link>
        <div className="bg-white text-black  rounded-2xl  shadow-md  mx-auto my-6 dark:text-white dark:bg-[#18181b]">
                
                <CardHeader post={post} />
                <CardBody post={post} />
                <CardFooter post={post} />
        </div>
    );
}