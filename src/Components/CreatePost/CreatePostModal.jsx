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
    Badge,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPhotos } from "react-icons/io";
import { toast } from "react-toastify";


export default function CreatePostModal({ isOpen, onOpenChange, onClose }) {

    function getUserInfo() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })

    }
    let { data, error, isError, isLoading } = useQuery({
        queryKey: ["UserInfo"],
        queryFn: getUserInfo,
        select: (data) => {
            return data.data.user
        }
    })

    console.log(data);


    let form = useForm({
        defaultValues: {
            body: "",
            image: "",

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

        axios.post('https://linked-posts.routemisr.com/posts', formData, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            if (res.data.message === "success") {
                form.reset()
                toast.success("Post created successfully!");
                // Clear form
                setSelectedImage(null); // Clear selected image
                onClose();
                // Close modal

                console.log(res);
            }
        }).catch((err) => {
            toast.error(err?.response?.data?.error || "Failed to create post");
            console.log(err?.response);
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


    return (
        <>
            <Modal isOpen={isOpen} placement="top-center" onClose={() => { setSelectedImage("") }} onOpenChange={onOpenChange}>
                <ModalContent className="max-w-2xl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-bold text-center ">
                                New Post
                            </ModalHeader>
                            <Divider />
                            <ModalBody className="p-3">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Badge color="success" content="" placement="bottom-right" shape="circle">
                                            <img src={data?.photo} className="w-12.5 rounded-full" alt="profile" />
                                        </Badge>
                                    </div>
                                    <span className="font-bold">{data?.name}</span>
                                </div>
                                <Textarea {...register("body")} minRows={selectedImage ? "" : "8"} placeholder="what's on your mind ?" />
                                {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="h-112.5 object-contain" alt="post image" />}
                                <Divider />
                                <div className="flex  items-center p-3">
                                    <span className="mx-1">Add to your post:</span>
                                    <IoMdPhotos onClick={openFileInput} className="text-green-600 text-2xl cursor-pointer" />
                                    <input className="cursor-pointer text-green-500" onChange={chooseFile} ref={fileInput} hidden type="file" />

                                </div>
                                <Divider />
                                <Button color="primary" className="m-3" type="submit" onPress={handleSubmit(createPost)} >
                                    Post
                                </Button>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
