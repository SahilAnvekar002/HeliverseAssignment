import { IconX } from '@tabler/icons-react'
import React from 'react'
import ClassroomForm from './ClassroomForm'
import TeacherForm from './TeacherForm'
import StudentForm from './StudentForm'
import EditStudentForm from './EditStudentForm'
import SelectStudentForm from './SelectStudentForm'
import EditTeacherForm from './EditTeacherForm'
import SelectTeacherForm from './SelectTeacherForm'

function Modal({modalType, setIsModalOpen, currentUser, triggerRefresh, triggerRefresh2, classId}) {
    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <div className='flex justify-between'>
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{modalType}</h3>
                                        <button onClick={()=>setIsModalOpen(false)}><IconX /></button>
                                    </div>
                                    {modalType == 'Classroom' && <ClassroomForm setIsModalOpen={setIsModalOpen}/>}
                                    {modalType == 'Teacher' && <TeacherForm setIsModalOpen={setIsModalOpen} triggerRefresh={triggerRefresh}/>}
                                    {modalType == 'Student' && <StudentForm setIsModalOpen={setIsModalOpen} triggerRefresh={triggerRefresh}/>}
                                    {modalType == 'Edit-Student' && <EditStudentForm setIsModalOpen={setIsModalOpen} currentUser={currentUser} triggerRefresh={triggerRefresh}/>}
                                    {modalType == 'Select-Student' && <SelectStudentForm setIsModalOpen={setIsModalOpen} classId={classId} triggerRefresh={triggerRefresh}/>}
                                    {modalType == 'Select-Teacher' && <SelectTeacherForm setIsModalOpen={setIsModalOpen} classId={classId} triggerRefresh2={triggerRefresh2}/>}
                                    {modalType == 'Edit-Teacher' && <EditTeacherForm setIsModalOpen={setIsModalOpen} currentUser={currentUser} triggerRefresh={triggerRefresh}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
