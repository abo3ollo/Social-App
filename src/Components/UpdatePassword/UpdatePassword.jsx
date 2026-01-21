import { Button, Divider, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLock } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import z from 'zod'

export default function UpdatePassword() {


    let [showPassword, setShowPassword] = useState(false)


    // schema
    let schema = z.object({
        password: z.string().regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
        ),
        newPassword: z.string().regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
        ),
    }).refine((object) => {
        return object.password !== object.newPassword
    }, {
        error: " New password must be different from current password",
        path: ["newPassword"]
    })


    let form = useForm({
        defaultValues: {
            password: "",
            newPassword: "",
        },
        resolver: zodResolver(schema)
    })

    let { register, handleSubmit } = form

    function changePassword(values) {
        console.log(values);
        axios.patch(`https://linked-posts.routemisr.com/users/change-password`, values, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((res) => {
            if (res.data.message === "success") {
                toast.success("Password updated!");
                console.log(res);

            }
        }).catch((err) => {
            toast.error(err?.response?.data?.error || "Failed to change password");
            console.log(err?.response);
        })


    }
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                        <BiLock className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Change Password</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Update your security credentials</p>
                    </div>
                </div>
                <Divider />


                <div className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Current Password</label>
                        <div className="relative">

                            <Input {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
                                endContent={showPassword ? <IoEyeOff className='text-2xl cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300' onClick={() => { setShowPassword(false) }} /> :
                                    <IoEye className=' text-2xl cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300' onClick={() => { setShowPassword(true) }} />} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">New Password</label>
                        <div className="relative">

                            <Input {...register("newPassword")} label="newPassword" type={`${showPassword ? "text" : "password"}`}
                                endContent={showPassword ? <IoEyeOff className='text-2xl cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300' onClick={() => { setShowPassword(false) }} /> :
                                    <IoEye className=' text-2xl cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300' onClick={() => { setShowPassword(true) }} />} />
                        </div>
                    </div>

                    <Button type="submit" onPress={handleSubmit(changePassword)} className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg mt-6">
                        Update Password
                    </Button>
                </div>
            </div>
        </>
    )
}
