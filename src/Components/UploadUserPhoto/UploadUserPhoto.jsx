import { useForm } from "react-hook-form"
import axios from 'axios'
import { toast } from 'react-toastify'
import { button, Button, Checkbox, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import { QueryClient, useQueryClient } from "@tanstack/react-query";



export default function UploadUserPhoto({isOpen, onOpenChange}) {

    

    let queryClient = useQueryClient()

    let { register, handleSubmit } = useForm({
        defaultValues: {
            photo: ""
        }
    })

    function uploadPhoto(values ,onClose) {
        // console.log(values.photo[0]);

        let imageData = new FormData()
        imageData.append("photo", values.photo[0])

        axios.put('https://linked-posts.routemisr.com/users/upload-photo', imageData, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            if (res.data.message == "success"){

                onClose();
                toast.success("Photo Updated")
                queryClient.invalidateQueries({
                    queryKey:["UserInfo"]
                })
                console.log(res);
            }

        }).catch((err) => {
            toast.error(err.response.data.error)
            console.log(err.response);

        })
    }
    return (
        <>
            
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Upload Photo</ModalHeader>
                            <ModalBody>

                                <form >

                                    <Input
                                        {...register("photo")}
                                        label="photo"
                                        placeholder=""
                                        variant="bordered"
                                        type="file"
                                    />
                                </form>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleSubmit((values) => uploadPhoto(values, onClose))()} >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

