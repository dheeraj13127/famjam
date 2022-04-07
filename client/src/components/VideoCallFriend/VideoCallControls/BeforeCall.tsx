import React from 'react'
import { Button, Header, Message } from 'semantic-ui-react'
import {IoMdCall} from 'react-icons/io'
import { useSelector } from 'react-redux'
import { famReducerState } from '../../../redux/reducers'
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs'
type BeforeCallType={
  callUser:(ids:any)=>void
  id:any
  receivingCall:boolean,
  stream:MediaStream,
  mute:boolean,
  setMute:any
}
function BeforeCall({callUser,id,receivingCall,setMute,stream,mute}:BeforeCallType) {
  const friendData=useSelector<famReducerState,famReducerState["videoCallFriendData"]>(state=>state.videoCallFriendData)

  const onCallUser=()=>{
    callUser(id)
  }
  return (
   <Header textAlign='center' as="h4">
     {
       !receivingCall&&(
         <>
          {mute ? (
            <Button
              size="mini"
              onClick={() => {
                setMute(false);
                stream.getTracks()[0].enabled = true;
              }}
              circular
              className="videoControlButtons"
              color="red"
            >
              <BsFillMicMuteFill className="afterCallIcons" />
            </Button>
          ) : (
            <Button
              size="mini"
              onClick={() => {
                setMute(true);
                stream.getTracks()[0].enabled = false;
              }}
              circular
              className="videoControlButtons"
            >
              <BsFillMicFill className="afterCallIcons" />
            </Button>
          )}
          <Button onClick={onCallUser} circular color='green'>
    <IoMdCall className='callIcon'/>
     </Button>
         </>
         

       )
     }
     
   </Header>
  )
}

export default BeforeCall