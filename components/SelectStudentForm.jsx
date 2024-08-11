"use client"
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';

function SelectStudentForm({setIsModalOpen, classId, triggerRefresh}) {

    const [students, setStudents] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        const getStudents = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudents`);
            const res = await data.json();
            setStudents(res.students);
            setValue(res.students?.filter((std)=> std.classId == '')[0]?._id);
          }
      
          getStudents();
    }, [])

    const handleChange = (e)=>{
        setValue(e.target.value);
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adduser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId : value, classId : classId})
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
                <p className="mt-1 text-sm leading-6 text-gray-600">Add studnet to the class.</p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Student</label>
                    <div className="mt-2">
                        {students?.length > 0 && <select id="country" name="country" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6" value={value} onChange={handleChange}>
                            {students?.filter((item)=> item?.classId == '' ).map((student)=>{
                                return(
                                    <option value={student?._id} key={student?._id}>{student?.fname} {student?.lname}</option>
                                )
                            })}
                        </select>}
                    </div>
                </div>
                </div>
            </div>
            <button className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6 mr-3'>Select Student</button>
            <button type='button' className='py-2 px-4 rounded-md bg-gray-800 text-white mt-6' onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
    )
}

export default SelectStudentForm
