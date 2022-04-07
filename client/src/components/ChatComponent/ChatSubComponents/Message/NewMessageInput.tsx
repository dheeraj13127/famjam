import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Icon, Input } from "semantic-ui-react";
import { famReducerState } from "../../../../redux/reducers";
import { useDispatch } from "react-redux";
import { createNewMessage } from "../../../../redux/actions";
import InputEmoji from "react-input-emoji";
import { useNavigate } from "react-router-dom";
type newMessageType = {
  newMessages: string;
  setNewMessages: any;
  famJamUserId: any;
  setMessage: any;
  message: any;
  socket: any;
  onlineUsers:any
};

function NewMessageInput({
  newMessages,
  setNewMessages,
  famJamUserId,
  setMessage,
  message,
  socket,
  onlineUsers
}: newMessageType) {
  const conversationId = useSelector<
    famReducerState,
    famReducerState["currentConversationId"]
  >((state) => state.currentConversationId);
  const friend = useSelector<famReducerState, famReducerState["friend"]>(
    (state) => state.friend
  );
  // const onNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewMessages(e.target.value);
  // };
  const dispatch = useDispatch();

  const newMessageSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newMessages !== "") {
      const newMessage = {
        conversationId: conversationId,
        sender: famJamUserId,
        text: newMessages,
      };
      dispatch(createNewMessage(newMessage, setMessage, message));
      socket.current.emit("sendMessage", {
        senderId: famJamUserId,
        receiverId: friend._id,
        text: newMessage,
      });

      setNewMessages("");
    }
  };
const navigate=useNavigate()
  return (
    <>
     
          
    
        <Button circular icon className="chatSendButton">
        <a href={`/videoCall/${friend._id}`}>
          <Icon className="chatSendIcon" name="video" />
          </a>
        </Button>
     

      <InputEmoji
        value={newMessages}
        onChange={setNewMessages}
        cleanOnEnter
        placeholder="Type a message"
      />
      <Button
        circular
        icon
        className="chatSendButton"
        onClick={newMessageSubmit}
      >
        <Icon className="chatSendIcon" name="send" />
      </Button>
    </>
  );
}

export default NewMessageInput;
