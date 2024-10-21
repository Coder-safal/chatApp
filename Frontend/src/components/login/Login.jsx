import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useAuth } from '../../context/AuthProvider.jsx'
import { Link } from 'react-router-dom'
export default function Login() {

    const { authUser, setAuthUser } = useAuth();
    const {
        register,
        handleSubmit,
        // watch, 
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            userName: data.userName,
            // email: data.email,
            password: data.password,
        };

        console.log(userInfo);

        axios.post("/api/v1/user/login", userInfo).then((response) => {
            console.log(response.data.data)
            if (response.data) {
                localStorage.setItem("token", JSON.stringify(response.data.data));
                setAuthUser(response.data.data);
                alert(response.data.message);

            }
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data) {
                alert("Errors: " + error.response.data.message)
            }
        })
    }

    return (
        <>
            <div className='bg-slate-800 shadow-xl text-white h-screen w-[100%] flex justify-center items-center'>
                <form action=""
                    onSubmit={handleSubmit(onSubmit)}
                    className='border border-black p-6 rounded-md'>
                    <h1 className='text-xl text-center py-2 font-bold text-blue-600'>Login Form</h1>
                    <div className='flex flex-col space-y-3 items-center'>
                        {/* userName */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Username"
                                {...register("userName", { required: true })}
                            />

                        </label>
                        {errors.userName && <span className='text-red-600 text-sm font-semibold'>**This field is required**</span>}

                        {/* password */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder="password"
                                {...register("password", { required: true })}
                            />

                        </label>
                        {errors.password && <span className='text-red-600 text-sm font-semibold'>**This field is required**</span>}
                        <div className='w-full flex flex-col justify-center items-center space-y-2'>
                            <input type="submit" value="Log In" className='bg-indigo-600 w-full py-2 rounded-lg' />
                            <p>Create an account? <Link to={"/signup"} className='text-blue-500 font-semibold underline'> Signup</Link > </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
