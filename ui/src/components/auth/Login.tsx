import { Navbar } from "../nav/Navbar"
import {useForm, type SubmitHandler} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { loginAPI } from "../../features/auth/loginAPI"
import { toast } from "sonner"
import { loginSuccess } from "../../features/auth/userSlice"
import { useDispatch } from "react-redux"

// define types  
type LoginInputs={
  email:string;
  password:string;
}

// define schema 
const schema = yup.object({
  email:yup.string().email('Invalid Email').max(100,'Max 100 characters').required('Email is resuired'),
  password:yup.string().min(6,'Min 6 characters').max(255,'Max 255 characters').required("Password is requrired")
});

export const Login = () => {
  const dispatch = useDispatch()
  const [loginUser,{isLoading}]=loginAPI.useLoginUserMutation()
  const{
    register,
    handleSubmit,
    formState: {errors}
  }=useForm<LoginInputs>({
    resolver:yupResolver(schema)
  })

  // define submit function 
  const onSubmit: SubmitHandler<LoginInputs>=async(data)=>{
    try {
      const response = await loginUser(data).unwrap()
      console.log(response.message);
      toast.success(response.message)
      // dispatch: store user info on successfull login to local storage 
      dispatch(loginSuccess(response))

    } catch (error:any) {
      console.log(error);
      toast.error(error.data.error)
    }
  }
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* email input  */}
          <input 
            type="email" 
            {...register("email")}
            placeholder="Email"
            className="input border border-gray-300 rounded w-full p-2 text-lg"
          />
          {/* handle validation errors  */}
          {
            errors.email &&(
              <span className="text-red-700 text-small">{errors.email.message}</span>
            )
          }
        {/* password input  */}
        <input 
            type="password" 
            {...register("password")}
            placeholder="Password"
            className="input border border-gray-300 rounded w-full p-2 text-lg"
         /> 
         {/* handle validation errors: password  */}
         {
          errors.password &&(
            <span className="text-red-700 text-small">{errors.password.message}</span>
          )
         }

         <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
        </form>
    </div>
    </div>
    </>
    
  )
}
