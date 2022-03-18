import React from "react";
import { Image } from "semantic-ui-react";
import { privateMessageType } from "../../../../redux/actionTypes/types";
import "../../../../styles/ChatComponentStyles/PrivateMessage.scss";
import {format} from 'timeago.js'
import { useSelector } from "react-redux";
import { famReducerState } from "../../../../redux/reducers";
function PrivateMessage({ sender,message }: privateMessageType) {
  let userData = useSelector<famReducerState, famReducerState["userData"]>((state) => state.userData);
  let friendData = useSelector<famReducerState, famReducerState["friend"]>((state) => state.friend);
  return (
    
    <div
      className={
        sender ? "privateMessageContainer sender" : "privateMessageContainer"
      }
    >
      <div className="privateMessageHeader">
        {!sender && (
          <Image
            src={friendData&&friendData.profilePicUrl}
            className="privateMessageProfileImg"
          />
        )}

        <p className="privateMessageText">
         {message.text}
          <br />
          <span className="privateMessageTime">{format(message.createdAt)}</span>
        </p>
        {sender && (
          <Image
            src={userData&&userData.profilePicUrl}
            className="privateMessageProfileImg senderImg"
          />
        )}
      </div>
    </div>
  );
}

export default PrivateMessage;
