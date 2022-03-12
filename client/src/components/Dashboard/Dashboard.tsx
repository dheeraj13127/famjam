import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
function Dashboard() {
  const famjamAuthToken=localStorage.getItem("famjamAuthToken")
  const navigate=useNavigate()
  useEffect(()=>{
    if(famjamAuthToken===""||famjamAuthToken===null||famjamAuthToken===undefined){
      navigate("/signIn")
    }
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard