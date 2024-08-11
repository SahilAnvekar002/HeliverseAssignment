"use client"
import { IconChevronDown, IconChevronRight, IconDashboard, IconSchool, IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

function Sidebar() {

  const ref = useRef();
  const pathname = usePathname();
  const router = useRouter();

  const [showClasses, setShowClasses] = useState(false);
  const [classes, setClasses] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    
    const getClasses = async()=>{
      const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getallclasses`, { cache: 'no-store' });
      const res = await data.json();
      setClasses(res.classes);
    }

    getClasses();

    const cuser = JSON.parse(localStorage.getItem('user'));
    if(!cuser){
      router.push('/login');
    }else{
      setAdmin(cuser?.designation);
      setAdminInfo(cuser);
    }

  }, [pathname])
  

  const handleClasses = ()=>{
    if(showClasses){
      setShowClasses(false);
    }
    else{
      setShowClasses(true);
    }
  }

  const toggleSidebar =()=>{
    if(ref.current.classList.contains('-translate-x-full')){
      ref.current.classList.remove('-translate-x-full');
      ref.current.classList.add('translate-x-0');
    }
    else{
      ref.current.classList.add('-translate-x-full');
      ref.current.classList.remove('translate-x-0');
    }
  }

  const logout =()=>{
    localStorage.removeItem('user');
    router.push('/login');
  }

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${pathname.includes('/login') && 'hidden'}`}>
        <div className="px-3 py-5 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleSidebar}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link href="/" className="flex ms-2 md:me-24">
                <img src="/logo.png" className="h-8 me-3" alt="E Classroom Logo" />
              </Link>
            </div>
            <button className='py-2 px-4 bg-white rounded-md text-sm' onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      <aside ref={ref} id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-24 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar ${pathname.includes('/login') && 'hidden'}`}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            {admin == 'Principal' && <li>
              <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IconDashboard className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>}
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={handleClasses}>
                <IconSchool className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Classes</span>
                {showClasses ? <IconChevronDown size={20}/> : <IconChevronRight size={20}/>}
              </Link>
              {showClasses && <ul className='max-h-60 overflow-y-scroll ml-14 mt-2' style={{scrollbarWidth : 'none'}}>
                  {admin == 'Principal' ? classes?.length > 0 && classes?.map((classroom)=>{
                    return(
                      <li key={classroom?._id} className='text-white '><Link href={`/class/${classroom?._id}`}>{classroom?.name}</Link></li>
                    )
                  }):
                  classes?.filter((c)=> adminInfo?.classId == c?._id)?.map((classroom)=>{
                    return(
                      <li key={classroom?._id} className='text-white '><Link href={`/class/${classroom?._id}`}>{classroom?.name}</Link></li>
                    )
                  })
                  }
              </ul>}
            </li>

            {admin == 'Principal'&& <li>
              <Link href="/teachers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IconUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Teachers</span>
              </Link>
            </li>}
            {admin !== 'Student' &&<li>
              <Link href="/students" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IconUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Students</span>
              </Link>
            </li>}     
          </ul>
          <div className='flex flex-col px-3 pb-2'>
            <span className='text-gray-500'>Logged in as {admin}</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
