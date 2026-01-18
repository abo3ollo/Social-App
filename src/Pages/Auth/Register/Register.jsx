
import { Input } from "@heroui/input";
import { Select, SelectItem, Button } from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios"
import { useState } from "react";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";




export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

export default function Register() {

  // paswword Eye
  let [showPassword, setShowPassword] = useState(false)


  // schema
  let schema = z.object({
    name: z.string().min(1, "Name is required").max(15, "name can't exceed15 characters"),
    email: z.email("Invalid email format"),
    password: z.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
    ),
    rePassword: z.string(),
    dateOfBirth: z.string().refine((dataValue) => {
      let userDate = new Date(dataValue);
      let now = new Date();
      now.setHours(0, 0, 0, 0);

      // Calculate age
      let age = now.getFullYear() - userDate.getFullYear();
      let monthDiff = now.getMonth() - userDate.getMonth();

      // Adjust age if birthday hasn't occurred this year
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < userDate.getDate())) {
        age--;
      }

      return userDate < now && age >= 12;
    }, "You must be at least 12 years old"),
    gender: z.enum(["male", "female"], "Gender should be male or female")
  }).refine((object) => {
    return object.password === object.rePassword
  }, {
    error: " password & repassword not match",
    path: ["rePassword"]
  })


  let form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema)
  })

  let { register, handleSubmit, formState } = form
  // let {onBlur , onChange , name , ref} = register("name")
  // 



  let [userError, setUserError] = useState('')
  let navigate = useNavigate()
  let [isLoadingFlag, setIsLoadingFlag] = useState(false)

  function handleRegister(values) {

    setIsLoadingFlag(true)

    axios.post("https://linked-posts.routemisr.com/users/signup", values).then((res) => {
      if (res.data.message) {
        setIsLoadingFlag(false)
        navigate("/login")
        toast.success("Register Successfully", {
                  position: "top-center",
                  
                })
      }

    }).catch((err) => {
      console.log(err.response.data.error);
      setUserError(err.response.data.error)
      setIsLoadingFlag(false)

    })
  }

  return (
    <>
      <main className='container w-[80%] space-y-5 '>
        <h1 className='text-4xl font-bold'> Welcome To App - Connect Now !</h1>
        <p className='text-lg font-medium text-primary-500'>Sign Up to join our Community </p>

        <h2 className="text-center text-red-500">{userError}</h2>

        <form onSubmit={handleSubmit(handleRegister)} className='w-full space-y-5 '>
          <Input {...register("name")} label="Name" type="text" />
          {formState.errors.name && formState.touchedFields.name ? <p className='text-red-400 text-center mb-3'>{formState.errors.name.message}</p> : ""}

          <Input {...register("email")} label="Email" type="email" />
          {formState.errors.email && formState.touchedFields.email ? <p className='text-red-400 text-center mb-3'>{formState.errors.email.message}</p> : ""}

          <Input {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
            endContent={showPassword ? <IoEyeOff className='text-2xl cursor-pointer' onClick={() => { setShowPassword(false) }} /> :
              <IoEye className=' text-2xl cursor-pointer' onClick={() => { setShowPassword(true) }} />} />

          {formState.errors.password && formState.touchedFields.password ? <p className='text-red-400 text-center mb-3'>{formState.errors.password.message}</p> : ""}


          {/* <Input {...register("RePassword")} label="rePassword" type="Password" /> */}
          <Input {...register("rePassword")} label="rePassword" type="Password" />
          {formState.errors.rePassword && formState.touchedFields.rePassword ? <p className='text-red-400 text-center mb-3'>{formState.errors.rePassword.message}</p> : ""}


          <div className="flex justify-between items-center gap-2">
            <Input {...register("dateOfBirth")} label="Birth Date" type="date" />

            <Select {...register("gender")} label="Gender" >
              {gender.map((gender) => (
                <SelectItem key={gender.key}>{gender.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex justify-around  m-0">
            {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ? <p className='text-red-400 text-center mb-3 '>{formState.errors.dateOfBirth.message}</p> : ""}
            {formState.errors.gender && formState.touchedFields.gender ? <p className='text-red-400 text-center mb-3'>{formState.errors.gender.message}</p> : ""}
          </div>

          <div className="flex justify-between items-center">
            <Button isLoading={isLoadingFlag} type='submit' color="primary">Submit</Button>
            <p>Already have an account? <Link to={"/login"} className='font-bold text-primary-500'>
              Sign in
            </Link>
            </p>
          </div>

        </form>

      </main>


    </>
  )
}
