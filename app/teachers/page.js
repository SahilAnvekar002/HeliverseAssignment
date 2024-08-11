"use client"
import AddComponent from '@/components/AddComponent';
import TableView from '@/components/TableView'
import React, { useEffect, useState } from 'react'

function Teachers() {

  const [teachers, setTeachers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {

    const getTeachers = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getteachers`);
      const res = await data.json();
      setTeachers(res.teachers);
    }

    getTeachers();

  }, [refreshKey])

  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1); // This will change the refreshKey and trigger useEffect
  }

  return (
    <>
      <TableView userType='Teacher' users={teachers} triggerRefresh={triggerRefresh} />
      <AddComponent triggerRefresh={triggerRefresh} />
    </>
  )
}

export default Teachers
