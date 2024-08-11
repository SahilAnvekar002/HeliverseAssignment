"use client"
import React, { useState } from 'react'
import { Bounce, toast } from 'react-toastify';

function ClassroomForm({ setIsModalOpen }) {

    const [formData, setFormData] = useState({
        name: "",
        startDay: "",
        endDay: "",
        startTime: "",
        endTime: ""
    })

    const handleChange = (data) => {
        setFormData(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-class`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const res = await data.json();

        if (res.error) {
            setFormData({
                name: "",
                startDay: "",
                endDay: "",
                startTime: "",
                endTime: ""
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
            <div className="border-b border-gray-900/10 pb-8">
                <p className="mt-1 text-sm leading-6 text-gray-600">Fill the below information to add a new class.</p>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="classname" className="block text-sm font-medium leading-6 text-gray-900">Class Name</label>
                        <div className="mt-2">
                            <input type="text" name="classname" id="classname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.name} onChange={(e) => handleChange({ ...formData, name: e.target.value })} required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="start-day" className="block text-sm font-medium leading-6 text-gray-900">Start Day</label>
                        <div className="mt-2">
                            <input type="text" name="start-day" id="start-day" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.startDay} onChange={(e) => handleChange({ ...formData, startDay: e.target.value })} required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="end-day" className="block text-sm font-medium leading-6 text-gray-900">End Day</label>
                        <div className="mt-2">
                            <input id="end-day" name="end-day" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.endDay} onChange={(e) => handleChange({ ...formData, endDay: e.target.value })} required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="start-time" className="block text-sm font-medium leading-6 text-gray-900">Start Time</label>
                        <div className="mt-2">
                            <input id="start-time" name="start-time" type="time" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.startTime} onChange={(e) => handleChange({ ...formData, startTime: e.target.value })} required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="end-time" className="block text-sm font-medium leading-6 text-gray-900">End Time</label>
                        <div className="mt-2">
                            <input id="end-time" name="end-time" type="time" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 sm:text-sm sm:leading-6" value={formData.endTime} onChange={(e) => handleChange({ ...formData, endTime: e.target.value })} required />
                        </div>
                    </div>
                </div>
            </div>
            <button type='submit' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6 mr-3'>Create Class</button>
            <button type='button' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6' onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
    )
}

export default ClassroomForm
