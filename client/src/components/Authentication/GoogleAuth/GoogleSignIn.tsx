import React from 'react'
import GoogleLogin from 'react-google-login';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { googleSignIn } from '../../../redux/actions';
function GoogleSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseSuccessGoogle = async (resp: any) => {
    toast('Will take few seconds',{
      icon:'⏳'
    })
    await axios({
      method: "POST",
      url: "https://famjam.onrender.com/auth/googleSignIn",
      data: { tokenId: resp.tokenId },
    })
      .then((res) => {
        
        dispatch(googleSignIn(res, navigate));
      })
      .catch((err) => {
     
        
        toast.error("Something went wrong !")});
  };
  const responseFailureGoogle = (resp: object) => {
    toast.error("Something went wrong !");
  
  };
  return (
    <div>
    
        <GoogleLogin
    clientId="1034920183548-99fe7306jpak3rgseithc9ba4kksdeek.apps.googleusercontent.com"
    buttonText="SignIn with Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseFailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
     <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default GoogleSignIn