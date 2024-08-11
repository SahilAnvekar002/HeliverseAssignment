"use client";

import { IconEdit, IconTrash } from '@tabler/icons-react'
import React, { useState } from 'react'
import Modal from './Modal'
import { Bounce, toast } from 'react-toastify';

function TableView({ userType, users, triggerRefresh }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    /*const handleDelete = async (id) => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/delete-user`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })

        const res = await data.json();

        if(res.error){
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
        }else{
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
    }*/

    return (
        <>
            <section className="text-gray-600 body-font md:mt-24 md:ml-72 mt-12">
                <div className="container px-12 md:py-10 py-24 mx-auto">
                    <div className=" w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-center whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Sr No</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">First Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Last Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Username</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Edit</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users?.length > 0 && users?.map((user, i) => {
                                    return (
                                        <tr key={user?._id}>
                                            <td className="border-b-2 border-gray-200 px-4 py-3">{i + 1}</td>
                                            <td className="border-b-2 border-gray-200 px-4 py-3">{user?.fname}</td>
                                            <td className="border-b-2 border-gray-200 px-4 py-3">{user?.lname}</td>
                                            <td className="border-b-2 border-gray-200 px-4 py-3">{user?.username}</td>
                                            <td className="border-b-2 border-gray-200 px-4 py-3">{user?.email}</td>
                                            <td className="border-b-2 border-gray-200 px-4 py-3">
                                                <button onClick={() => { setIsModalOpen(true), setCurrentUser(user) }}> <IconEdit /> </button>
                                            </td>
                                            {/*<td className="border-b-2 border-gray-200 px-4 py-3">
                                                <button onClick={() => handleDelete(user?._id)}> <IconTrash /> </button>
                                            </td>*/}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} modalType={`Edit-${userType}`} currentUser={currentUser} triggerRefresh={triggerRefresh} />}
        </>
    )
}

export default TableView
