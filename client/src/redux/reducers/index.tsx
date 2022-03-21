import { actionType } from '../actions'
import { famFriendsType } from '../actionTypes/types'
import { GOOGLE_SIGNUP_SUCCESS,GOOGLE_SIGNIN_SUCCESS,SIGNUP_SUCCESS,SIGNIN_SUCCESS, GET_USER_PROFILE, GET_FAM_FRIENDS, GET_CONVERSATIONS, SET_CURRENT_CONVERSATIONS, CURRENT_FRIEND_MESSAGE, GET_CURRENT_CONVERSATION_ID, GET_INDIVIDUAL_CONVERSATION } from '../constants/constants'
export interface famReducerState{
    googleSignUpId:string,
    googleSignInId:string,
    signUpId:string,
    signInId:string,
    userData:any,
    famFriendsData:any,
    userConversations:any
    currentMessages:any,
    friend:any,
    currentConversationId:string
    conversationData:any
}

const initState={
    googleSignUpId:"",
    googleSignInId:"",
    signUpId:"",
    signInId:"",
    userData:null,
    famFriendsData:null,
    userConversations:null,
    conversationId:"",
    currentMessages:null,
    friend:null,
    currentConversationId:"",
    conversationData:null
}

export const famReducer=(state:famReducerState=initState,action:actionType)=>{
    switch(action.type){
        case GOOGLE_SIGNUP_SUCCESS:{
            return Object.assign({},state,{
                googleSignUpId:action.payload,
          
              })
        }
        case GOOGLE_SIGNIN_SUCCESS:{
            return Object.assign({},state,{
                googleSignInId:action.payload,
          
              })
        }
        case SIGNUP_SUCCESS:{
            return Object.assign({},state,{
                signUpId:action.payload,
          
              })
        }
        case SIGNIN_SUCCESS:{
            return Object.assign({},state,{
                signInId:action.payload,
          
              })
        }
        case GET_USER_PROFILE:{
            return Object.assign({},state,{
                userData:action.payload,
          
              })
        }
        case GET_FAM_FRIENDS:{
            return Object.assign({},state,{
                famFriendsData:action.payload,
          
              })
        }
        case GET_CONVERSATIONS:{
            return Object.assign({},state,{
                userConversations:action.payload,
          
              })
        }
        case SET_CURRENT_CONVERSATIONS:{
            return Object.assign({},state,{
                currentMessages:action.payload,
          
              })
        }
        case CURRENT_FRIEND_MESSAGE:{
            return Object.assign({},state,{
                friend:action.payload,
          
              })
        }
        case GET_CURRENT_CONVERSATION_ID:{
            return Object.assign({},state,{
                currentConversationId:action.payload,
          
              })
        }
        case GET_INDIVIDUAL_CONVERSATION:{
            return Object.assign({},state,{
                conversationData:action.payload,
          
              })
        }
        default:
            return state
    }
}