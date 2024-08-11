"use client"
import Modal from "@/components/Modal";
import Hamburger from "hamburger-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react'

function AddComponent({ triggerRefresh }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [admin, setAdmin] = useState(null);

    const pathname = usePathname();

    useEffect(() => {
        const cuser = JSON.parse(localStorage.getItem('user'));
        if (cuser) {
            setAdmin(cuser?.designation);
        }
    }, [pathname])


    const handleOpen = () => {
        if (isOpen) {
            setIsOpen(false);
        }
        else {
            setIsOpen(true);
        }
    }

    return (
        <>
            <button className={`fixed bottom-5 right-5 rounded-full bg-gray-800 ${(pathname.includes('/login')|| admin == 'Student' ) && 'hidden'}`}>
                <Hamburger size={14} color="white" toggle={handleOpen} toggled={isOpen} />
            </button>
            <div className={`fixed bottom-14 right-14 ${isOpen ? 'flex' : 'hidden'} flex-col bg-gray-800 py-8 px-6 rounded-xl`}>
                <ul>
                    {admin == 'Principal' && <li className="text-white mb-3 cursor-pointer hover:text-gray-400 transition-colors" onClick={() => { setIsModalOpen(true), setModalType('Classroom'), setIsOpen(false) }}>Classroom</li>}
                    {admin == 'Principal' &&<li className="text-white mb-3 cursor-pointer hover:text-gray-400 transition-colors" onClick={() => { setIsModalOpen(true), setModalType('Teacher'), setIsOpen(false) }}>Teacher</li>}
                    <li className="text-white cursor-pointer hover:text-gray-400 transition-colors" onClick={() => { setIsModalOpen(true), setModalType('Student'), setIsOpen(false) }}>Student</li>
                </ul>
            </div>

            {isModalOpen && <Modal modalType={modalType} setIsModalOpen={setIsModalOpen} triggerRefresh={triggerRefresh} />}
        </>
    )
}

export default AddComponent
