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
      url: "https://famjams.herokuapp.com/auth/googleSignIn",
      data: { tokenId: resp.tokenId },
    })
      .then((res) => {
        
        dispatch(googleSignIn(res, navigate));
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something went wrong !")});
  };
  const responseFailureGoogle = (resp: object) => {
    toast.error("Something went wrong !");
    console.log(resp,"respFailurw")
  };
  return (
    <div>
    
        <GoogleLogin
    clientId="550449438201-3fbk3ajdsdp17gqm6gfiqmb3lvq5rnmm.apps.googleusercontent.com"
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