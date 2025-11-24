import { Navbar } from "../nav/Navbar"
import {useForm, type SubmitHandler} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

// define types  
type VerifyInputs={
  email:string;
  code:number;
}

// define schema 
const schema = yup.object({
  email:yup.string().email('Invalid Email').max(100,'Max 100 characters').required('Email is resuired'),
  code:yup.number().min(6,'Max 6 characters').required("Code is requrired")
});

export const Verification = () => {

  const{
    register,
    handleSubmit,
    formState: {errors}
  }=useForm<VerifyInputs>({
    resolver:yupResolver(schema)
  })

  // define submit function 
  const onSubmit: SubmitHandler<VerifyInputs>=(data)=>{
    console.log(data);
  }
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Account Verification</h1>
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
            type="number" 
            {...register("code")}
            placeholder="Code"
            className="input border border-gray-300 rounded w-full p-2 text-lg"
         /> 
         {/* handle validation errors: password  */}
         {
          errors.code &&(
            <span className="text-red-700 text-small">{errors.code.message}</span>
          )
         }

         <button type="submit" className="btn btn-primary w-full mt-4">Verify your Account</button>
        </form>
    </div>
    </div>
    </>
    
  )
}
