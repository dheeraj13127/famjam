import { CREATE_NEW_MESSAGE, CURRENT_FRIEND_MESSAGE, GET_CONVERSATIONS, GET_CURRENT_CONVERSATION_ID, GET_FAM_FRIENDS, GET_INDIVIDUAL_CONVERSATION, GET_USER_PROFILE, GOOGLE_SIGNUP_SUCCESS, SET_CURRENT_CONVERSATIONS, SIGNUP_SUCCESS } from "../constants/constants";
import toast from "react-hot-toast";
import { createMessageType, famFriendsType, friendIdType, googleSignUpType, OwnUserDataType, signInType, signUpType, userDataType } from "../actionTypes/types";
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

  export const setCurrentConversation=(conversationId:string,setMessage:any)=>async(dispatch:any)=>{
    await axios.get(`https://famjams.herokuapp.com/auth/getCreatedMessage/${conversationId}`)
    .then(res=>{
      setMessage(res.data)
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
  
  export const getCurrentConversationId=(conversationId:string)=>async(dispatch:any)=>{
    dispatch({
      type:GET_CURRENT_CONVERSATION_ID,
      payload:conversationId
    })
  }
  
  export const createNewMessage=(newMessage:createMessageType,setMessage:any,message:any)=>async(dispatch:any)=>{
    await axios.post("https://famjams.herokuapp.com/auth/createMessage",newMessage)
    .then(res=>{
     
      setMessage([...message,res.data])
      dispatch({
        type:CREATE_NEW_MESSAGE,
        payload:res.data
      })

      
    })
      
  }
  export const getIndividualConversation=(conversationData:any)=>async(dispatch:any)=>{
    dispatch({
      type:GET_INDIVIDUAL_CONVERSATION,
      payload:conversationData
    })

  }

  export const sendFamFriendRequest=(friendId:string,userData:OwnUserDataType)=>async(dispatch:any)=>{
    let exists=true
    const data={
      friendId:friendId,
      newUserData:{
        _id:userData._id,
        userName:userData.userName,
        profilePic:userData.profilePicUrl
      }
    }
    // console.log(checkFriendPresent(friendId))
    await axios.get(`https://famjams.herokuapp.com/auth/getFriendProfile/${friendId}`)
    .then(async(res)=>{
      console.log(res)
      res.data.user.famRequestsReceived.length!==0&&res.data.user.famRequestsReceived.map((m:any)=>{
        if(m._id===userData._id){
          exists=false
        }
      })

      if(exists){
        await axios.post("https://famjams.herokuapp.com/auth/updateFriendRequest",data)
        .then(resp=>{
         toast("Request sent",{
           icon:"👍"
         })
          
        })
        .catch(err=>{})
      }
      else{
        toast("Request already sent!",{
          icon:"😕"
        })
      }
  
    })
    .catch(err=>{
       toast("User not found !",{
         icon:"😕"
       })
    })


  }

export const deleteFamFriendRequest=(userId:string,friendId:string)=>async(dispatch:any)=>{
  const data={
    userId:userId,
    friendId:friendId
  }

  await axios.post("https://famjams.herokuapp.com/auth/deleteFamFriendRequest",data)
  .then(res=>{
    
    toast("Rejected",{
      icon:"❌"
    })
    setTimeout(()=>{
      window.location.reload()
    },1500)
  })
  .catch(err=>{
    toast.error("Something went wrong !")
  })
}
export const acceptFamFriendRequest=(userId:string,friendId:string)=>async(dispatch:any)=>{
  const data={
    userId:userId,
    friendId:friendId
  }
  
  await axios.post("https://famjams.herokuapp.com/auth/acceptFamFriendRequest",data)
  .then(res=>{
    toast("Accepted",{
      icon:"✅"
    })
    setTimeout(()=>{
      window.location.reload()
    },1500)
  })
  .catch(err=>{
    toast.error("Something went wrong !")
  })
}