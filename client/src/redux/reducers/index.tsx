import { actionType } from '../actions'
import { GOOGLE_SIGNUP_SUCCESS,GOOGLE_SIGNIN_SUCCESS,SIGNUP_SUCCESS,SIGNIN_SUCCESS } from '../constants/constants'
export interface famReducerState{
    googleSignUpId:string,
    googleSignInId:string,
    signUpId:string,
    signInId:string
}

const initState={
    googleSignUpId:"",
    googleSignInId:"",
    signUpId:"",
    signInId:""
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
        default:
            return state
    }
}