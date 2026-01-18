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
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPhotos } from "react-icons/io";
import { toast } from "react-toastify";


export default function CreatePostModal({ isOpen, onOpenChange }) {


    let form = useForm({
        defaultValues:{
            body: "",
            image: "",

        }
    })

    let {register , handleSubmit} = form

    function createPost(values){
        console.log(values); // values hna by3ml log ll body bs mesh rady read image 
        
        // console.log(values.body);
        // console.log(values.image[0]);


        // let formData =new FormData()
        // formData.append("body" ,values.body)
        // formData.append("image" ,values.image[0])

        // axios.post('https://linked-posts.routemisr.com/posts', formData, {
        //     headers: {
        //         token: localStorage.getItem("userToken")
        //     }
        // }).then((res) => {
        //     if (res.data.message === "success") {
        //         toast.success("Post created successfully!");
        //          // Clear form
        //         setSelectedImage(null); // Clear selected image
        //         // Close modal
        //         console.log(res);
        //     }
        // }).catch((err) => {
        //     toast.error(err?.response?.data?.error || "Failed to create post");
        //     console.log(err.response);
        // })

        
    }    

    const fileInput = useRef()
    // const userTextArea = useRef()
    const [selectedImage , setSelectedImage] = useState("")

    function openFileInput(){
        fileInput.current.click()
    }
    function chooseFile(){
        const file  = fileInput.current.files[0]
        console.log(file);
        setSelectedImage(file)

    }


    return (
        <>
            <Modal isOpen={isOpen} placement="top-center"  onClose={()=>{setSelectedImage("")}} onOpenChange={onOpenChange}>
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
                                <Textarea {...register("body")} minRows={selectedImage? "": "8"} label="body" placeholder="what's on your mind ?" />
                                {selectedImage && <img  src={URL.createObjectURL(selectedImage)} className="h-112.5 object-contain" alt="" />}
                                <Divider />
                                <div className="flex  items-center p-3">
                                    <span className="mx-1">Add to your post:</span>
                                    <IoMdPhotos  onClick={openFileInput} className="text-green-600 text-2xl cursor-pointer" />
                                    <input {...register("image")} onChange={chooseFile}  ref={fileInput}  type="file" hidden />
                                    
                                </div>
                                <Divider />
                                {/* <Button  color="primary" className="m-3" onPress={() => handleSubmit((values) => createPost(values, onClose))()} > */}
                                <Button  color="primary" className="m-3" type="submit"  >
                                    Create
                                </Button>
                            </ModalBody>
                            
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
