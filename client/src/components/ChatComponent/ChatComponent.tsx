import React, { useEffect, useRef, useState } from "react";
import { Grid } from "semantic-ui-react";
import { NewMessageInput, NoMessage, PrivateMessage } from ".";
import "../../styles/ChatComponentStyles/ChatComponent.scss";
import { chatComponentType } from "../../redux/actionTypes/types";
import {io} from 'socket.io-client'
import { useSelector } from "react-redux";
import { famReducerState } from "../../redux/reducers";

function ChatComponent({ message, setMessage }: chatComponentType) {
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const [arrivalMessage,setArrivalMessage]=useState<any>(null)

  const conversationData=useSelector<famReducerState,famReducerState["conversationData"]>(state=>state.conversationData)

  const [newMessages, setNewMessages] = useState("");
  const scrollRef = useRef<any>();
  const socket=useRef<any>()
  useEffect(()=>{
    socket.current=io("https://famjams.herokuapp.com")
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
    
    })
  },[famJamUserId])

  

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
            {message.length !== 0 ? (
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
            {message.length!==0 ? (
              <>
                <NewMessageInput
                  message={message}
                  setMessage={setMessage}
                  famJamUserId={famJamUserId}
                  newMessages={newMessages}
                  setNewMessages={setNewMessages}
                  socket={socket}
                
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
