import { CURRENT_FRIEND_MESSAGE, GET_CONVERSATIONS, GET_FAM_FRIENDS, GET_USER_PROFILE, GOOGLE_SIGNUP_SUCCESS, SET_CURRENT_CONVERSATIONS, SIGNUP_SUCCESS } from "../constants/constants";
import toast from "react-hot-toast";
import { famFriendsType, googleSignUpType, signInType, signUpType } from "../actionTypes/types";
import axios from "axios";

export type actionType = {
  type: string;
  payload: string | object | undefined;
};
export const googleSignUp =
  (response: googleSignUpType, navigate: any) => async (dispatch: any) => {
    toast.success("Successfully signed up !");
    const token = response.data.token;
    const userId = response.data.user._id;

    sessionStorage.setItem("famjamAuthToken", token);
    sessionStorage.setItem("famJamUserId", userId);
    dispatch({
      type: GOOGLE_SIGNUP_SUCCESS,
      payload: userId,
    });

  
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };
export const googleSignIn =
  (response: googleSignUpType, navigate: any) => async (dispatch: any) => {
    toast.success("Successfully signed in !");
    const token = response.data.token;
    const userId = response.data.user._id;
    sessionStorage.setItem("famJamUserId",userId)
    sessionStorage.setItem("famjamAuthToken", token);
   
    dispatch({
      type: GOOGLE_SIGNUP_SUCCESS, 
      payload: userId,
    });


    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };
export const userSignUp =
  (response: signUpType, navigate: any) => async (dispatch: any) => {
    toast('Will take few seconds',{
        icon:'⏳'
      })
    await axios
      .post("https://famjams.herokuapp.com/auth/signUp", response)
      .then((res) => {
        const token = res.data.accessToken;
        const userId = res.data.user._id;
        sessionStorage.setItem("famjamAuthToken", token);
        sessionStorage.setItem("famJamUserId", userId);

        toast.success("Successfully signed up !");
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: userId,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  export const userSignIn =
  (response: signInType, navigate: any) => async (dispatch: any) => {
    toast('Will take few seconds',{
        icon:'⏳'
      })
   await axios
      .post("https://famjams.herokuapp.com/auth/signIn", response)
      .then((res) => {
        const token = res.data.accessToken;
        const userId = res.data.user._id;
        sessionStorage.setItem("famjamAuthToken", token);
        sessionStorage.setItem("famJamUserId", userId);
        toast.success("Successfully signed in !");
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: userId,
        }); 

       
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500); 
      })
      .catch((err) => {
 
          toast.error(err.response.data.message)});
  };

  export const getUserProfile=(resp:any)=>async(dispatch:any)=>{

    await axios.post("https://famjams.herokuapp.com/auth/getProfile",resp)
    .then(res=>{
     
      dispatch({
        type:GET_USER_PROFILE,
        payload:res.data.user
      })
    })
    .catch(err=>console.log(err))
  }
  export const userSignout=(navigate:any)=>async(dispatch:any)=>{
    toast.success("Successfully signed out !");
    sessionStorage.setItem("famjamAuthToken", "");
    sessionStorage.setItem("famJamUserId", "");
    navigate('/signIn')
  }

  export const getFamFriends=(userId:any)=>async(dispatch:any)=>{
   
    await axios.get(`https://famjams.herokuapp.com/auth/getFamFriends/${userId}`)
    .then(res=>{

      dispatch({
        type:GET_FAM_FRIENDS,
        payload:res.data
      })

    })
  }

  export const getConversations=(userId:any,setConversations:any)=>async(dispatch:any)=>{

      await axios.get(`https://famjams.herokuapp.com/auth/getChatConversation/${userId}`)
      .then(res=>{

        setConversations(res.data)
        dispatch({
          type:GET_CONVERSATIONS,
          payload:res.data
        })
      })
  }

  export const setCurrentConversation=(conversationId:string)=>async(dispatch:any)=>{
    await axios.get(`https://famjams.herokuapp.com/auth/getCreatedMessage/${conversationId}`)
    .then(res=>{
      
      dispatch({
        type:SET_CURRENT_CONVERSATIONS,
        payload:res.data
      })

      
    })
      
  }

  export const getCurrentFriendMessage=(friend:famFriendsType)=>async(dispatch:any)=>{
    dispatch({
      type:CURRENT_FRIEND_MESSAGE,
      payload:friend
    })
  }
  
