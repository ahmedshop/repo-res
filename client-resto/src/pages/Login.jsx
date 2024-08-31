import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../config/axios'
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { handleSubmit, register } = useForm()
    const [errors, setErrors] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const [loginUrl, setLoginUrl] = useState()
    const auth = useAuth()

    const displayErrors = (errors) => {
        return errors.map((error, index) => (
            <span className='text-sm text-red-600 block' key={index}>
                {error}
            </span>
        ))
    }

    const onSubmit = async (data) => {
        try {
            await auth.loginAction(data)
        } catch (err) {
            if (err.response?.data) {
                const response = err.response?.data
                if (response.errors) {
                    setErrors(response.errors)
                } else if (response.message) {
                    setErrorMessage(response.message)
                }
            }
        }
    }

    useEffect(() => {
        axios
            .get('auth', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setLoginUrl(response.data.url);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className='max-w-3xl m-auto pt-20 px-4'>
            <header className='text-center'>
                <h1 className='text-[#333] text-3xl font-medium'>Log in</h1>
                <p className='text-[#333] mt-4'>Don’t have an count? <Link to='/signup' className='text-[#111] underline'>Sign up</Link></p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className='pt-16 flex flex-col gap-8'>

                {errorMessage && <span className='text-sm text-red-600 block'>
                    {errorMessage}
                </span>}
                <div>
                    <label htmlFor="email" className='block text-[#666] text-base'>Your email</label>
                    <input type="email" placeholder='Enter your email address' id='email'
                        className='w-full px-4 py-3 border rounded-lg mt-2 border-gray-300'
                        {...register('email', { required: true })} />
                    <div className='mt-2 flex flex-col gap-2'>
                        {errors?.email && displayErrors(errors.email)}
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className='block text-[#666] text-base'>Your password</label>
                    <input type="password" placeholder='Enter your password' id='password'
                        className='w-full px-4 py-3 border rounded-lg mt-2 border-gray-300'
                        {...register('password', { required: true })}
                    />
                    <div className='mt-2 flex flex-col gap-2'>
                        {errors?.password && displayErrors(errors.password)}
                    </div>
                </div>

                <button type='submit' className='bg-gray-400 py-4 rounded-3xl text-white'>Log in</button>

            </form>

            <span className='block text-center text-[#666] text-lg my-8'>OR continue with</span>

            <Link to={loginUrl} className="px-4 py-2 border flex justify-center gap-3 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span>Google</span>
            </Link>
        </div>
    )
}

export default Login