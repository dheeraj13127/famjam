import React, { useEffect, useState} from "react";
import { Button, Grid, Icon, Input } from "semantic-ui-react";
import { useDispatch,useSelector } from "react-redux";
import { NoMessage, PrivateMessage } from ".";

import "../../styles/ChatComponentStyles/ChatComponent.scss";
import { getConversations } from "../../redux/actions";
import { famReducerState } from "../../redux/reducers";

function ChatComponent() {
  const dispatch=useDispatch()
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const [conversations,setConversations]=useState([])
  useEffect(()=>{
    dispatch(getConversations(famJamUserId,setConversations ))
  },[])
  const currentMessages=useSelector<famReducerState,famReducerState["currentMessages"]>(state=>state.currentMessages)
  console.log(currentMessages)
  return (
    <div className="chatComponentContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={12}
            mobile={16}
            tablet={16}
            className="chatColumn"
          >
           {
             currentMessages?(currentMessages.map((mes:any,key:any)=>(
              <PrivateMessage key={key} message={mes} sender={mes.sender===famJamUserId}/>
             ))):(
               <NoMessage/>
             )
           }
           
            
          </Grid.Column>
          <Grid.Column
            className="chatTypeColumn"
            computer={10}
            largeScreen={11}
            widescreen={12}
            mobile={16}
            tablet={16}
          >
            {
              currentMessages?(
                <>
                 <Button icon primary className="chatEmojiButton">
              <Icon name="smile outline" />
            </Button>
            <Input
              className="chatComponentMessageType"
              placeholder="Search..."
            />
            <Button icon primary className="chatSendButton" animated>
              <Button.Content visible>Send</Button.Content>
              <Button.Content hidden>
                <Icon name="send" />
              </Button.Content>
            </Button>
                </>
              ):
              (
                <></>
              )
            }
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ChatComponent;
