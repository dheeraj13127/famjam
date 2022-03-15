import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { googleSignUp } from "../../../redux/actions";
function GoogleSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseSuccessGoogle = async (resp: any) => {
    toast('Will take few seconds',{
      icon:'⏳'
    })
    await axios({
      method: "POST",
      url: "https://famjams.herokuapp.com/auth/googleSignUp",
      data: { tokenId: resp.tokenId },
    })
      .then((res) => {
       
        dispatch(googleSignUp(res, navigate));
      })
      .catch((err) =>toast.error(err.response.data.message));
  };
  const responseFailureGoogle = (resp: object) => {
    toast.error("Something went wrong !");
  };
  return (
    <div>
      <GoogleLogin
        clientId="1034920183548-99fe7306jpak3rgseithc9ba4kksdeek.apps.googleusercontent.com"
        buttonText="SignUp with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailureGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default GoogleSignUp;
