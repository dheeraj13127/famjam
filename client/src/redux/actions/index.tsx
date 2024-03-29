import {
  CREATE_NEW_MESSAGE,
  CURRENT_FRIEND_MESSAGE,
  GET_CONVERSATIONS,
  GET_CURRENT_CONVERSATION_ID,
  GET_FAM_FRIENDS,
  GET_INDIVIDUAL_CONVERSATION,
  GET_INDIVIDUAL_FAMZONE,
  GET_MY_FAMZONES,
  GET_ONLINE_USERS,
  GET_PARTICULAR_FAMZONE_MEMBERS,
  GET_USER_PROFILE,
  GET_VIDEOCALL_FRIEND_PROFILE,
  GOOGLE_SIGNUP_SUCCESS,
  SET_CURRENT_CONVERSATIONS,
  SIGNUP_SUCCESS,
} from "../constants/constants";
import toast from "react-hot-toast";
import {
  createMessageType,
  famFriendsType,
  googleSignUpType,
  OwnUserDataType,
  rewardsSectionDataType,
  signInType,
  signUpType,
} from "../actionTypes/types";
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
    sessionStorage.setItem("famJamUserId", userId);
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
    toast("Will take few seconds", {
      icon: "⏳",
    });
    await axios
      .post("https://famjam.onrender.com/auth/signUp", response)
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
    toast("Will take few seconds", {
      icon: "⏳",
    });
    await axios
      .post("https://famjam.onrender.com/auth/signIn", response)
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
        toast.error(err.response.data.message);
      });
  };

export const getUserProfile = (resp: any) => async (dispatch: any) => {
  await axios
    .post("https://famjam.onrender.com/auth/getProfile", resp)
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user,
      });
    })
    .catch((err) => console.log(err));
};
export const userSignout = (navigate: any) => async (dispatch: any) => {
  toast.success("Successfully signed out !");
  sessionStorage.setItem("famjamAuthToken", "");
  sessionStorage.setItem("famJamUserId", "");
  navigate("/signIn");
};

export const getFamFriends = (userId: any) => async (dispatch: any) => {
  await axios
    .get(`https://famjam.onrender.com/auth/getFamFriends/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_FAM_FRIENDS,
        payload: res.data,
      });
    });
};

export const getConversations =
  (userId: any, setConversations: any) => async (dispatch: any) => {
    await axios
      .get(`https://famjam.onrender.com/auth/getChatConversation/${userId}`)
      .then((res) => {
        setConversations(res.data);
        dispatch({
          type: GET_CONVERSATIONS,
          payload: res.data,
        });
      });
  };

export const setCurrentConversation =
  (conversationId: string, setMessage: any) => async (dispatch: any) => {
    await axios
      .get(
        `https://famjam.onrender.com/auth/getCreatedMessage/${conversationId}`
      )
      .then((res) => {
        setMessage(res.data);
        dispatch({
          type: SET_CURRENT_CONVERSATIONS,
          payload: res.data,
        });
      });
  };

export const getCurrentFriendMessage =
  (friend: famFriendsType) => async (dispatch: any) => {
    dispatch({
      type: CURRENT_FRIEND_MESSAGE,
      payload: friend,
    });
  };

export const getCurrentConversationId =
  (conversationId: string) => async (dispatch: any) => {
    dispatch({
      type: GET_CURRENT_CONVERSATION_ID,
      payload: conversationId,
    });
  };

export const createNewMessage =
  (newMessage: createMessageType, setMessage: any, message: any) =>
  async (dispatch: any) => {
    await axios
      .post("https://famjam.onrender.com/auth/createMessage", newMessage)
      .then((res) => {
        setMessage([...message, res.data]);
        dispatch({
          type: CREATE_NEW_MESSAGE,
          payload: res.data,
        });
      });
  };
export const getIndividualConversation =
  (conversationData: any) => async (dispatch: any) => {
    dispatch({
      type: GET_INDIVIDUAL_CONVERSATION,
      payload: conversationData,
    });
  };

export const sendFamFriendRequest =
  (friendId: string, userData: OwnUserDataType) => async (dispatch: any) => {
    let exists = true;
    const data = {
      friendId: friendId,
      newUserData: {
        _id: userData._id,
        userName: userData.userName,
        profilePic: userData.profilePicUrl,
      },
    };
    // console.log(checkFriendPresent(friendId))
    await axios
      .get(`https://famjam.onrender.com/auth/getFriendProfile/${friendId}`)
      .then(async (res) => {
        res.data.user.famRequestsReceived.length !== 0 &&
          res.data.user.famRequestsReceived.map((m: any) => {
            if (m._id === userData._id) {
              exists = false;
            }
          });

        if (exists) {
          await axios
            .post(
              "https://famjam.onrender.com/auth/updateFriendRequest",
              data
            )
            .then((resp) => {
              toast("Request sent", {
                icon: "👍",
              });
            })
            .catch((err) => {});
        } else {
          toast("Request already sent!", {
            icon: "😕",
          });
        }
      })
      .catch((err) => {
        toast("User not found !", {
          icon: "😕",
        });
      });
  };

export const deleteFamFriendRequest =
  (userId: string, friendId: string) => async (dispatch: any) => {
    const data = {
      userId: userId,
      friendId: friendId,
    };

    await axios
      .post("https://famjam.onrender.com/auth/deleteFamFriendRequest", data)
      .then((res) => {
        toast("Rejected", {
          icon: "❌",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        toast.error("Something went wrong !");
      });
  };
export const acceptFamFriendRequest =
  (userId: string, friendId: string) => async (dispatch: any) => {
    const data = {
      userId: userId,
      friendId: friendId,
    };
    const conversationData = {
      senderId: friendId,
      receiverId: userId,
    };

    await axios
      .post("https://famjam.onrender.com/auth/acceptFamFriendRequest", data)
      .then(async (res) => {
        toast("Accepted", {
          icon: "✅",
        });
        await axios
          .post(
            "https://famjam.onrender.com/auth/chatConversation",
            conversationData
          )
          .then((resp) => {})
          .catch((errr) => {
            toast.error("Something went wrong !");
          });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        toast.error("Something went wrong !");
      });
  };

export const startChatConversation =
  (senderId: string, receiverId: string) => async (dispatch: any) => {
    const data = {
      senderId: senderId,
      receiverId: receiverId,
    };
  };

export const userProfileEdit =
  (userId: any, userName: string, profilePicUrl: string) =>
  async (dispatch: any) => {
    const data = {
      userName: userName,
      profilePicUrl: profilePicUrl,
    };
    await axios
      .put(`https://famjam.onrender.com/auth/editUserProfile/${userId}`, data)
      .then((res) => {
        toast.success("Updated Successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong !");
      });
  };
export const updateNewFamies =
  (userId: any, newFamies: number,nfamies:number) => async (dispatch: any) => {
    const data = {
      newFamies: newFamies,
    };
    await axios.put(`https://famjam.onrender.com/auth/updateFamies/${userId}`,data)
    .then(res=>{
      toast.success(`Successfully transfered ${nfamies} famies`)

    })
    .catch(err=>{
      toast.error("Something went wrong !")
    })
  };
export const updateFamiesDay =
  (userId: any, newDay: any) => async (dispatch: any) => {
    const data = {
      newDay: newDay,
    };
    await axios
      .put(`https://famjam.onrender.com/auth/updateFamiesDay/${userId}`, data)
      .then((res) => {
        setTimeout(() => {
          window.location.pathname = "/dashboard";
        }, 5500);
      })
      .catch((err) => {
        toast.error("Something went wrong !");
      });
  };

  export const getVideoCallFriendProfile=(friendId:any)=>async(dispatch:any)=>{
    await axios
    .get(`https://famjam.onrender.com/auth/getFriendProfile/${friendId}`)
    .then(res=>{
      dispatch({
        type: GET_VIDEOCALL_FRIEND_PROFILE,
          payload: res.data,
      })
      
    })
    .catch(err=>{})
  }
  export const getOnlineUsers=(users:any)=>async(dispatch:any)=>{
    dispatch({
      type:GET_ONLINE_USERS,
      payload:users
    })
  }
  
  export const updateFamiesForRedeem =
  (userId: any, newFamies: number,rd:rewardsSectionDataType) => async (dispatch: any) => {
   
    const data = {
      newFamies: newFamies,
    };
    const newData={
      rdData:rd
    }
    await axios.put(`https://famjam.onrender.com/auth/updateFamies/${userId}`,data)
    .then(async(res)=>{
      await axios.put(`https://famjam.onrender.com/auth/updateFamTags/${userId}`,newData)
      .then(resp=>{
        
        toast.success("Successfully purchased")
        setTimeout(()=>{
          window.location.reload()
        },2000)
      })
      .catch(err=>{
        toast.error("Something went wrong !")
      })
    })
    .catch(err=>{
      toast.error("Something went wrong !")
    })
  };

  export const createNewFamZone=(userId:any,famZoneData:any)=>async(dispatch:any)=>{
    await axios
    .post("https://famjam.onrender.com/auth/createNewFamZone",famZoneData)
    .then(async(res)=>{
     let data={
       createdFamZoneData:res.data,
       userId:userId
     }
      await axios.post("https://famjam.onrender.com/auth/updateFamZoneDetailsInUsers",data)
      .then(resp=>{
        toast.success("Successfully created")
        setTimeout(()=>{
          window.location.pathname = "/dashboard";
        },1500)
      })
      .catch(errs=>{
        toast.error("Something went wrong !")
      })
    })
    .catch(err=>toast.error("Something went wrong !"))
  }

  export const getMyFamZones=(userId:any)=>async(dispatch:any)=>{
    await axios
    .get(`https://famjam.onrender.com/auth/getFamZones/${userId}`)
    .then(res=>{
     
      dispatch({
        type: GET_MY_FAMZONES,
          payload: res.data,
      })
      
    })
    .catch(err=>toast.error("Something went wrong !"))
  }
  export const getIndividualFamZone=(famZoneId:any)=>async(dispatch:any)=>{
    await axios
    .get(`https://famjam.onrender.com/auth/getIndividualFamZone/${famZoneId}`)
    .then(res=>{
     
      dispatch({
        type: GET_INDIVIDUAL_FAMZONE,
          payload: res.data[0],
      })
      
    })
    .catch(err=>toast.error("Something went wrong !"))
  }


  export const getParticularFamZoneMembers=(famZoneId:any)=>async(dispatch:any)=>{
    await axios
    .get(`https://famjam.onrender.com/auth/getParticularFamZoneMembers/${famZoneId}`)
    .then(res=>{
     
      dispatch({
        type: GET_PARTICULAR_FAMZONE_MEMBERS,
          payload: res.data,
      })
      
    })
    .catch(err=>toast.error("Something went wrong !"))
  }