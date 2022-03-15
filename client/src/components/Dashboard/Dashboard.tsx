import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { DashboardSideBar } from '.'
import { useDispatch,useSelector } from "react-redux";
import { getUserProfile } from '../../redux/actions';
import toast, { Toaster } from "react-hot-toast";
import { famReducerState } from '../../redux/reducers';


function Dashboard() {
    const dispatch = useDispatch();

  const famjamAuthToken=localStorage.getItem("famjamAuthToken")
  let famJamUserId=localStorage.getItem("famJamUserId")
  let userProfile={
    userId:famJamUserId
  }
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(getUserProfile(userProfile))
},[])
  let userData=useSelector<famReducerState,famReducerState["userData"]>(state=>state.userData)
  console.log("userData",userData)
  useEffect(()=>{
    if(famjamAuthToken===""||famjamAuthToken===null||famjamAuthToken===undefined){
      navigate("/signIn")
    }
  },[])


  return (
    <div>
      <DashboardSideBar userData={userData}/>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Dashboard