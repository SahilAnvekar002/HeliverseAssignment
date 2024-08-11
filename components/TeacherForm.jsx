"use client"
import React, { useState } from 'react'
import { Bounce, toast } from 'react-toastify';

function TeacherForm({ setIsModalOpen, triggerRefresh }) {

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        designation: 'Teacher'
    })

    const handleChange = (data) => {
        setFormData(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const res = await data.json();

        if (res.error) {
            setFormData({
                fname: '',
                lname: '',
                username: '',
                email: '',
                password: '',
                designation: 'Student'
            })
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
        else {
            if(triggerRefresh){
                triggerRefresh();
            }
            setIsModalOpen(false);
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
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="border-b border-gray-900/10 pb-8">
                <p class="mt-1 text-sm leading-6 text-gray-600">Fill the below information to add a new teacher.</p>

                <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.fname} onChange={(e) => handleChange({ ...formData, fname: e.target.value })} required/>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div class="mt-2">
                            <input type="text" name="last-name" id="last-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.lname} onChange={(e) => handleChange({ ...formData, lname: e.target.value })} required/>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div class="mt-2">
                            <input type="text" name="username" id="username" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.username} onChange={(e) => handleChange({ ...formData, username: e.target.value })} required/>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div class="mt-2">
                            <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.email} onChange={(e) => handleChange({ ...formData, email: e.target.value })} required/>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input type="password" name="password" id="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.password} onChange={(e) => handleChange({ ...formData, password: e.target.value })} required/>
                        </div>
                    </div>
                </div>
            </div>
            <button type='submit' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6 mr-3'>Create Teacher</button>
            <button type='button' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6' onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
    )
}

export default TeacherForm;
