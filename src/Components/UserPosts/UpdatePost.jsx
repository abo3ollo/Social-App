
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    Divider,
    Textarea,
    image,
} from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPhotos } from "react-icons/io";
import { toast } from "react-toastify";

export default function UpdatePost({ isOpen, onOpenChange, onClose, postId }) {
    // console.log(postId);

    let queryClient = useQueryClient()


    let form = useForm({
        defaultValues: {
            body: "",


        }
    })

    let { register, handleSubmit } = form

    function createPost(values) {
        console.log(values); // values hna by3ml log ll body bs mesh rady read image 

        console.log(values.body);
        console.log(selectedImage);


        let formData = new FormData()
        formData.append("body", values.body)
        formData.append("image", selectedImage)

        axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            if (res.data.message === "success") {
                form.reset()
                toast.success("Post updated!");
                setSelectedImage(null); // Clear selected image
                onClose();
                queryClient.invalidateQueries({
                    queryKey: ["getUserPosts"]
                })
                console.log(res);
            }
        }).catch((err) => {
            toast.error(err?.response?.data?.error || "Failed to create post");
            console.log(err.response);
        })


    }

    const fileInput = useRef()
    // const userTextArea = useRef()
    const [selectedImage, setSelectedImage] = useState("")

    function openFileInput() {
        fileInput.current.click()
    }
    function chooseFile() {
        const file = fileInput.current.files[0]
        console.log(file);
        setSelectedImage(file)

    }


    return <>
        <Modal isOpen={isOpen} placement="top-center" onClose={() => { setSelectedImage("") }} onOpenChange={onOpenChange}>
            <ModalContent className="max-w-2xl">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-extrabold text-center">
                            Create Post
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="p-3">
                            <div className="flex items-center gap-2">
                                <div>
                                    <img
                                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                                        className="w-12.5 rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div className="flex  flex-col ">
                                    <span className="font-bold">mostafa</span>
                                    <span>active</span>
                                </div>
                            </div>
                            <Textarea {...register("body")} minRows={selectedImage ? "" : "8"} placeholder="what's on your mind ?" />
                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="h-112.5 object-contain" alt="" />}
                            <Divider />
                            <div className="flex  items-center p-3">
                                <span className="mx-1">Add to your post:</span>
                                <IoMdPhotos onClick={openFileInput} className="text-green-600 text-2xl cursor-pointer" />
                                <input className="cursor-pointer text-green-500" onChange={chooseFile} ref={fileInput} hidden type="file" />

                            </div>
                            <Divider />
                            <Button color="primary" className="m-3" type="submit" onPress={handleSubmit(createPost)} >
                                Create
                            </Button>
                        </ModalBody>

                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}
