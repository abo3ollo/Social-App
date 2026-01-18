import { Button, Checkbox, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { BiImage } from 'react-icons/bi'


import React from 'react'
import AllComments from '../../Components/AllComments/AllComments'
import { useQuery } from '@tanstack/react-query'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { toast } from 'react-toastify'


export default function CreateCommentsModal({ isOpen, onOpenChange, postId }) {
    // console.log(postId);


    let { register, handleSubmit } = useForm({
        defaultValues: {
            content: "",
            post: postId,
        }
    })

    function addComment(values, onClose) {
        console.log(values);
        axios.post("https://linked-posts.routemisr.com/comments", values, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            console.log(res);
            if (res.data.message == "success") {
                onClose();
                toast.success("Comment added Successfully", {
                    position: "top-center",
                })
            }

        }).catch((err) => {
            console.log(err);

        })

    }

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
            return data?.data?.post

        }
    })
    // console.log(data);

    return (

        <div className="flex flex-col gap-2">
            {/* <Button onPress={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Write Your Comment</ModalHeader>
                            <Divider />

                            <ModalBody>
                                <form >
                                    <Input
                                        {...register("content")}
                                        label="Content"
                                        placeholder="Enter your Comment"
                                        variant="bordered"
                                    />
                                    <Input
                                        {...register("post")}
                                        label="Post"
                                        type="hidden"
                                        variant="bordered"
                                        value={postId}
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onPress={() => handleSubmit((values) => addComment(values, onClose))()} color="primary" >
                                    Add
                                </Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}







