import React, { useEffect, useRef, useState } from "react";
import { Grid } from "semantic-ui-react";
import { NewMessageInput, NoMessage, PrivateMessage } from ".";
import "../../styles/ChatComponentStyles/ChatComponent.scss";
import { chatComponentType } from "../../redux/actionTypes/types";
import {io} from 'socket.io-client'
import { useSelector,useDispatch } from "react-redux";
import { famReducerState } from "../../redux/reducers";

import { getOnlineUsers } from "../../redux/actions";

function ChatComponent({ message, setMessage,activateMessage,onlineUsers,setOnlineUsers }: chatComponentType) {
  
  const dispatch=useDispatch()
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const [arrivalMessage,setArrivalMessage]=useState<any>(null)
  
  const conversationData=useSelector<famReducerState,famReducerState["conversationData"]>(state=>state.conversationData)

  const [newMessages, setNewMessages] = useState("");
  const scrollRef = useRef<any>();
  const socket=useRef<any>()
  useEffect(()=>{
    socket.current=io("https://famjam.onrender.com")
    
    socket.current.on("getMessage",(data:any)=>{
      
      setArrivalMessage({
        sender:data.senderId,
        text:data.text.text,
        createdAt:Date.now()
      }) 
    }) 
  },[])

  useEffect(()=>{
    arrivalMessage&&
    conversationData?.members.includes(arrivalMessage.sender)&& 
    setMessage((prev:any)=>[...prev,arrivalMessage])
  },[arrivalMessage,conversationData])




  useEffect(()=>{
    socket.current.emit("addUser",famJamUserId)
    socket.current.on("getUsers",(users:any)=>{
     setOnlineUsers(users)
     dispatch(getOnlineUsers(users))
    })
  },[famJamUserId])

  return (
    <div className="chatComponentContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={11}
            mobile={16}
            tablet={16}
            className="chatColumn"
          >
     
            {message.length !== 0&&activateMessage ? (
              message.map((mes: any, key: any) => (
               
                  <PrivateMessage
                    key={key}
                    message={mes}
                    sender={mes.sender === famJamUserId}
                    scrollRef={scrollRef}
                  />
              
              ))
            ) : (
              <NoMessage />
            )}
          </Grid.Column>
          <Grid.Column
            className="chatTypeColumn"
            computer={10}
            largeScreen={11}
            widescreen={12}
            mobile={16}
            tablet={16}
          >

            {activateMessage? (
              <>
                <NewMessageInput
                  message={message}
                  setMessage={setMessage}
                  famJamUserId={famJamUserId}
                  newMessages={newMessages}
                  setNewMessages={setNewMessages}
                  socket={socket}
                  onlineUsers={onlineUsers}
                />
              </>
            ) : (
              <></>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ChatComponent;
