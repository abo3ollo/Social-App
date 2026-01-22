
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios"
import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from 'react-toastify';
import { UserContext } from "../../../Context/UserContext";
import { Helmet } from "react-helmet";




export default function Login() {
  let { userLogin, setUserLogin } = useContext(UserContext)


  let [showPassword, setShowPassword] = useState(false)

  // schema
  let schema = z.object({

    email: z.email("Invalid email format"),
    password: z.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
    ),

  })




  let form = useForm({
    defaultValues: {
      email: "",
      password: "",

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

    axios.post("https://linked-posts.routemisr.com/users/signin", values).then((res) => {
      if (res.data.message == "success") {

        console.log(res.data.token);
        localStorage.setItem("userToken", res.data.token)
        setUserLogin(res.data.token)

        setIsLoadingFlag(false)
        navigate("/")
        toast.success("Logged In Successfully", {
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
      <Helmet>
        <title>Login - ConnecSo</title>
      </Helmet>
      <main className='container w-[80%] space-y-5 '>
        <h1 className='text-4xl font-bold'> Welcome Back To ConnecSo !</h1>
        <p className='text-lg font-medium text-primary-500'>Login to join our Community </p>

        <h2 className="text-center text-red-500">{userError}</h2>

        <form onSubmit={handleSubmit(handleRegister)} className='w-full space-y-5 '>


          <Input {...register("email")} label="Email" type="email" />
          {formState.errors.email && formState.touchedFields.email ? <p className='text-red-400 text-center mb-3'>{formState.errors.email.message}</p> : ""}

          <Input {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
            endContent={showPassword ? <IoEyeOff className='text-2xl cursor-pointer' onClick={() => { setShowPassword(false) }} /> :
              <IoEye className=' text-2xl cursor-pointer' onClick={() => { setShowPassword(true) }} />} />
          {formState.errors.password && formState.touchedFields.password ? <p className='text-red-400 text-center mb-3'>{formState.errors.password.message}</p> : ""}



          <div className="flex justify-between items-center  ">
            <Button isLoading={isLoadingFlag} className="mx-2" type='submit' color="primary">Login</Button>
            <p > Don't have an account? <Link to={"/register"} className='font-bold text-primary-500'>
              Sign up
            </Link>
            </p>
          </div>

        </form>

      </main>
    </>
  )
}

