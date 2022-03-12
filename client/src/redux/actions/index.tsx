import { GOOGLE_SIGNUP_SUCCESS, SIGNUP_SUCCESS } from "../constants/constants";
import toast from "react-hot-toast";
import { googleSignUpType, signInType, signUpType } from "../actionTypes/types";
import axios from "axios";
export type actionType = {
  type: string;
  payload: string | object | undefined;
};
export const googleSignUp =
  (response: googleSignUpType, navigate: any) => async (dispatch: any) => {
    const token = response.data.token;
    const userId = response.data.user._id;

    localStorage.setItem("famjamAuthToken", token);
    localStorage.setItem("famJamUserId", userId);
    dispatch({
      type: GOOGLE_SIGNUP_SUCCESS,
      payload: userId,
    });

    toast.success("Successfully signed up !");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2500);
  };
export const googleSignIn =
  (response: googleSignUpType, navigate: any) => async (dispatch: any) => {
    const token = response.data.token;
    const userId = response.data.user._id;

    localStorage.setItem("famjamAuthToken", token);
    localStorage.setItem("famJamUserId", userId);
    dispatch({
      type: GOOGLE_SIGNUP_SUCCESS,
      payload: userId,
    });

    toast.success("Successfully signed in !");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2500);
  };
export const userSignUp =
  (response: signUpType, navigate: any) => async (dispatch: any) => {
    axios
      .post("http://localhost:7000/auth/signUp", response)
      .then((res) => {
        const token = res.data.accessToken;
        const userId = res.data.user._id;
        localStorage.setItem("famjamAuthToken", token);
        localStorage.setItem("famJamUserId", userId);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: userId,
        });

        toast.success("Successfully signed up !");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  export const userSignIn =
  (response: signInType, navigate: any) => async (dispatch: any) => {
    axios
      .post("http://localhost:7000/auth/signIn", response)
      .then((res) => {
        const token = res.data.accessToken;
        const userId = res.data.user._id;
        localStorage.setItem("famjamAuthToken", token);
        localStorage.setItem("famJamUserId", userId);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: userId,
        });

        toast.success("Successfully signed up !");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      })
      .catch((err) => {
 
          toast.error(err.response.data.message)});
  };