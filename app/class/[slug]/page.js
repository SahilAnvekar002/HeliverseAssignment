"use client"
import Modal from '@/components/Modal';
import { IconPlus } from '@tabler/icons-react'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Class({ params }) {

  const slug = params.slug;

  const [currentTab, setCurrentTab] = useState('Teacher');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [classInfo, setClassInfo] = useState({});
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshKey2, setRefreshKey2] = useState(0);
  const [admin, setAdmin] = useState(null);
  const router = usePathname();

  useEffect(() => {
    const cuser = JSON.parse(localStorage.getItem('user'));
    if(cuser){
      setAdmin(cuser?.designation);
    }
  }, [router])
  

  useEffect(() => {

    const getClass = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getclass/${slug}`);
      const res = await data.json();
      setClassInfo(res.classroom);
    }
    getClass();

  }, [])

  useEffect(() => {

    const getTeachers = async () => {
      const data2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getclassteacher/${slug}`);
      const res2 = await data2.json();
      setTeacher(res2.teacher);
    }

    getTeachers();

  }, [refreshKey2])


  useEffect(() => {
    const getStudents = async () => {
      const data3 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getclassstudents/${slug}`);
      const res3 = await data3.json();
      setStudents(res3.students);
    }

    getStudents();
  }, [refreshKey])


  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1); // This will change the refreshKey and trigger useEffect
  }

  const triggerRefresh2 = () => {
    setRefreshKey2(oldKey => oldKey + 1); // This will change the refreshKey and trigger useEffect
  }

  return (
    <>
      <div className='md:ml-72 py-28 px-8'>
        <h1 className='text-2xl font-semibold'>Welcome Back, Principal</h1>
        <div className='border border-gray-300 mt-6 pt-10 rounded-xl'>

          <div className='flex justify-between items-center border-b border-gray-300 px-10 pb-8'>
            <h1 className='text-xl'>{classInfo?.name}</h1>
            <span className='text-lg text-gray-700'>{classInfo?.startDay} - {classInfo?.endDay}</span>
            <span className='text-lg text-gray-700'>{classInfo?.startTime} - {classInfo?.endTime}</span>
          </div>

          <div className='md:flex hidden'>
            <div className='flex flex-col pt-6 px-10 lg:w-1/3 w-[20%] items-center border-r border-gray-300'>
              <h1 className='text-lg font-semibold'>Teacher</h1>
              <div className='py-8'>
                {teacher && <span className=''>{teacher?.fname} {teacher?.lname}</span>}
                {teacher == null && admin=='Principal' && <button className=' py-1 px-1 rounded-full bg-gray-800 text-white text-sm' onClick={() => { setIsModalOpen(true), setModalType('Select-Teacher') }}> <IconPlus /> </button>}
              </div>
            </div>
            <div className='flex flex-col pt-6 px-10 lg:w-1/3 w-[20%] items-center border-r border-gray-300'>
              <h1 className='text-lg font-semibold pb-8'>Students</h1>
              <ul className='overflow-y-scroll max-h-80' style={{ scrollbarWidth: 'none' }}>
                {students?.length > 0 && students?.map((student) => {
                  return (
                    <li className='mb-2' key={student?._id}>{student?.fname} {student?.lname}</li>
                  )
                })}
              </ul>
              {admin != 'Student' && <button className='mt-3 py-1 px-1 rounded-full bg-gray-800 text-white text-sm' onClick={() => { setIsModalOpen(true), setModalType('Select-Student') }}> <IconPlus /> </button>}
            </div>
            <div className='flex flex-col pt-6 px-10 lg:w-1/3 w-[60%] items-center'>
              <h1 className='text-lg font-semibold'>Timetable</h1>
              <div className='py-8'>

                <table className="table-auto w-full text-center whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Sr No</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Time</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b-2 border-gray-200 px-4 py-3">1</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-gray-200 px-4 py-3">2</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-gray-200 px-4 py-3">3</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-gray-200 px-4 py-3">4</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                      <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <div className='md:hidden flex justify-center'>
            <ul className="mt-10 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="me-2">
                <button onClick={() => setCurrentTab('Teacher')} className={`inline-block p-4 rounded-t-lg ${currentTab == 'Teacher' && 'text-gray-600'} ${currentTab == 'Teacher' && 'bg-gray-50'} ${currentTab == 'Teacher' && 'dark:bg-gray-900'} ${currentTab == 'Teacher' && 'dark:text-gray-300'} transition-colors`}>Teacher</button>
              </li>
              <li className="me-2">
                <button onClick={() => setCurrentTab('Student')} className={`inline-block p-4 rounded-t-lg ${currentTab == 'Student' && 'text-gray-600'} ${currentTab == 'Student' && 'bg-gray-50'} ${currentTab == 'Student' && 'dark:bg-gray-900'} ${currentTab == 'Student' && 'dark:text-gray-300'} transition-colors`}>Students</button>
              </li>
              <li className="me-2">
                <button onClick={() => setCurrentTab('Timetable')} className={`inline-block p-4 rounded-t-lg ${currentTab == 'Timetable' && 'text-gray-600'} ${currentTab == 'Timetable' && 'bg-gray-50'} ${currentTab == 'Timetable' && 'dark:bg-gray-900'} ${currentTab == 'Timetable' && 'dark:text-gray-300'} transition-colors`}>TimeTable</button>
              </li>
            </ul>
          </div>

          {currentTab == 'Teacher' && <div className='flex flex-col pt-6 px-10 w-full items-center border-r border-gray-300 md:hidden'>
            <div className='pb-8 pt-4'>
              {teacher && <span className=''>{teacher?.fname} {teacher?.lname}</span>}
            </div>
          </div>}

          {currentTab == 'Student' && <div className='flex flex-col pt-6 px-10 w-full py-10 border-r items-center border-gray-300 md:hidden'>
            <ul className='mt-5 overflow-y-scroll max-h-80' style={{ scrollbarWidth: 'none' }}>
              {students?.length > 0 && students?.map((student) => {
                return (
                  <li className='mb-2' key={student?._id}>{student?.fname} {student?.lname}</li>
                )
              })}
            </ul>
            <button className='mt-3 py-1 px-1 rounded-full bg-gray-800 text-white text-sm' onClick={() => { setIsModalOpen(true), setModalType('Select-Student') }}> <IconPlus /> </button>
          </div>}

          {currentTab == 'Timetable' && <div className='flex flex-col pt-6 px-10 w-full items-center md:hidden'>
            <div className='py-8'>
              <table className="table-auto w-full text-center whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Sr No</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Time</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b-2 border-gray-200 px-4 py-3">1</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                  </tr>
                  <tr>
                    <td className="border-b-2 border-gray-200 px-4 py-3">2</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                  </tr>
                  <tr>
                    <td className="border-b-2 border-gray-200 px-4 py-3">3</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                  </tr>
                  <tr>
                    <td className="border-b-2 border-gray-200 px-4 py-3">4</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">10.00 - 11.00</td>
                    <td className="border-b-2 border-gray-200 px-4 py-3">Maths</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>}

        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} modalType={modalType} classId={slug} triggerRefresh={triggerRefresh} triggerRefresh2={triggerRefresh2} />}
    </>
  )
}

export default Class
