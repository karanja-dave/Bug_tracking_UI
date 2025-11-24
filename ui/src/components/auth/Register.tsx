import { Navbar } from "../nav/Navbar"
import {useForm, type SubmitHandler} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'

// types 
type RegisterInputs={
    first_name:string;
    last_name:string;
    email:string;
    phone_number:string;
    password:string;
    confirmpassword:string;
  }

// define schema :validates user input is what is required
const schema = yup.object({
  first_name:yup.string().max(50,"Max 50 Characters").required('First name is required'),
  last_name:yup.string().max(50,"Max 50 Characters").required('Last name is required'),
  email:yup.string().email('Invalid Email').max(100,'Max 100 Characters').required('Email is required'),
  phone_number:yup.string().max(20,'Max 50 Characters').required('Phone number is required'),
  password:yup.string().min(6,'Min 6 Characters').max(255,'Max 255 Characters').required('Password is required'),
  // confirm pass 
  confirmpassword: yup.string()
    .oneOf([yup.ref('password')],'Passowords must match') //refferences the password and confirm that input given is same as that of password
    .required('Confirm password is required')

})




export const Register = () => {
  const{
    register, //will be use to register every field
    handleSubmit,
    formState: {errors} //handles error when useer validate input requirments
  }=useForm<RegisterInputs>({
    resolver : yupResolver(schema) //tell form to use yup resolver to vallidate input using the schema
  })

  // define submit function 
  const onSubmit:SubmitHandler<RegisterInputs>= (data)=>{
    console.log(data);
}
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-base-200">
        {/* registration using useForm and Yup */}
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Account Registeration</h1>
          {/* define a form where we will include our form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
            {/* first name input  */}
            <input 
            type="text" 
            {...register("first_name")}
            placeholder="First Name"
            className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {/* handle error for FN validation input  */}
            {
              errors.first_name &&(
                <span className="text-red-700 text-small">{errors.first_name.message}</span>
              )
            }
            {/* last name input  */}
            <input 
            type="text" 
            {...register("last_name")}
            placeholder="Last Name"
            className="input border border-gray-300 rounded w-full p-2 text-lg"
             />
             {/* error handling: last_name  */}
             {
              errors.last_name &&(
                <span className="text-red-700 text-small">{errors.last_name.message}</span>
              )
             }
             {/* email input  */}
            <input 
            type="email" 
            {...register("email")}
            placeholder="Email"
            className="input border border-gray-300 rounded w-full p-2 text-lg"
             />
            {/* error handling:email  */}
            {
              errors.email &&(
                <span className="text-red-700 text-small">{errors.email.message}</span>
              )
            }
            {/* phone number input  */}
            <input
            type="text" 
            {...register("phone_number")}
            placeholder="Phone Number" 
            className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {/* error handling:phone number  */}
            {
              errors.phone_number &&(
                <span className="text-red-700 text-small">{errors.phone_number.message}</span>
              )
            }
            {/* password input  */}
            <input 
            type="password" 
            {...register("password")}
            placeholder="Password" 
            className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {/* error handling password  */}
            {
              errors.password &&(
                <span className="text-red-700 text-small">{errors.password.message}</span>
              )
            }
            {/* confirm password input  */}
            <input 
            type="password" 
            {...register("confirmpassword")}
            placeholder="Confirm Password" 
            className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {/* error handling password  */}
            {
              errors.confirmpassword &&(
                <span className="text-red-700 text-small">{errors.confirmpassword.message}</span>
              )
            }
            

            <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
          </form>
        </div>
    </div>
    </>
    
  )
}
