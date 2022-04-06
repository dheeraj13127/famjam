import React from 'react'
import { Button, Header, Message } from 'semantic-ui-react'
import {IoMdCall} from 'react-icons/io'
import { useSelector } from 'react-redux'
import { famReducerState } from '../../../redux/reducers'
type BeforeCallType={
  callUser:(ids:any)=>void
  id:any
  receivingCall:boolean
}
function BeforeCall({callUser,id,receivingCall}:BeforeCallType) {
  const friendData=useSelector<famReducerState,famReducerState["videoCallFriendData"]>(state=>state.videoCallFriendData)

  const onCallUser=()=>{
    callUser(id)
  }
  return (
   <Header textAlign='center' as="h4">
     {
       !receivingCall&&(
<Button onClick={onCallUser} circular color='green'>
    <IoMdCall className='callIcon'/>
     </Button>
       )
     }
     
   </Header>
  )
}

export default BeforeCall