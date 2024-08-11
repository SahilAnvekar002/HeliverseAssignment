"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Bounce, toast } from 'react-toastify';

function Login() {

    const router = useRouter();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (data) => {
        setLoginData(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })

        const res = await data.json();

        if (res.success) {
            localStorage.setItem('user', JSON.stringify(res.user));
            toast.success(res.success, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.push('/');
        }
        else {

            if (loginData.email == process.env.NEXT_PUBLIC_ADMIN_ID && loginData.password == process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                localStorage.setItem('user', JSON.stringify({ email: process.env.NEXT_PUBLIC_ADMIN_ID, password: 'NEXT_PUBLIC_ADMIN_PASSWORD', designation: 'Principal' }));
                toast.success("Principal logged in successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                router.push('/');
            } else {
                toast.error(res.error, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    }

    return (
        <div className='md:w-1/2 w-[70%] mx-auto py-40'>
            <h1 className='text-2xl mb-8'>User Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input type="email" name="email" id="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={loginData.email} onChange={(e) => handleChange({ ...loginData, email: e.target.value })} required />
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input type="password" name="password" id="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={loginData.password} onChange={(e) => handleChange({ ...loginData, password: e.target.value })} required />
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <button className='bg-gray-800 text-white rounded-md py-2 px-4'>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
