"use client"
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import CryptoJS from "crypto-js";

function EditTeacherForm({ setIsModalOpen, currentUser, triggerRefresh }) {

    const [formData, setFormData] = useState({
        id : '',
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {

        const bytes = CryptoJS.AES.decrypt(currentUser?.password, process.env.NEXT_PUBLIC_SECRET_KEY);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        setFormData({
            id: currentUser?._id,
            fname : currentUser?.fname,
            lname : currentUser?.lname,
            username: currentUser?.username,
            email: currentUser?.email,
            password: decryptedPassword
        })

    }, [currentUser])
    

    const handleChange = (data) => {
        setFormData(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update-user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const res = await data.json();
        setIsModalOpen(false);

        if (res.error) {
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
            triggerRefresh();
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
            <div className="border-b border-gray-900/10 pb-8">
                <p className="mt-1 text-sm leading-6 text-gray-600">Edit the existing teacher information here.</p>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div className="mt-2">
                            <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.fname} onChange={(e) => handleChange({ ...formData, fname: e.target.value })} required/>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div className="mt-2">
                            <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.lname} onChange={(e) => handleChange({ ...formData, lname: e.target.value })} required/>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input type="text" name="username" id="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.username} onChange={(e) => handleChange({ ...formData, username: e.target.value })} required/>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input type="email" name="email" id="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.email} onChange={(e) => handleChange({ ...formData, email: e.target.value })} required/>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input type="password" name="password" id="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.password} onChange={(e) => handleChange({ ...formData, password: e.target.value })} required/>
                        </div>
                    </div>
                </div>
            </div>
            <button type='submit' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6 mr-3'>Edit Teacher</button>
            <button type='button' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6' onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
    )
}

export default EditTeacherForm;
