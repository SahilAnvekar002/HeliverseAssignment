"use client"
import AddComponent from '@/components/AddComponent';
import TableView from '@/components/TableView'
import React, { useEffect, useState } from 'react'

function Students() {

  const [students, setStudents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    
    const getStudents = async()=>{
      const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudents`);
      const res = await data.json();
      setStudents(res.students);
    }

    getStudents();

  }, [refreshKey])

  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1); // This will change the refreshKey and trigger useEffect
  }
  
  return (
    <>
      <TableView userType='Student' users={students} triggerRefresh={triggerRefresh}/>
      <AddComponent triggerRefresh={triggerRefresh}/>
    </>
  )
}

export default Students
