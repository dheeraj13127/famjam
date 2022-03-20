import React, { useEffect, useRef, useState } from "react";
import { Grid } from "semantic-ui-react";
import { NewMessageInput, NoMessage, PrivateMessage } from ".";
import "../../styles/ChatComponentStyles/ChatComponent.scss";
import { chatComponentType } from "../../redux/actionTypes/types";

function ChatComponent({ message, setMessage }: chatComponentType) {
  let famJamUserId = sessionStorage.getItem("famJamUserId");

  const [newMessages, setNewMessages] = useState("");
  const scrollRef = useRef<any>();

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
            {message ? (
              <>
                <NewMessageInput
                  message={message}
                  setMessage={setMessage}
                  famJamUserId={famJamUserId}
                  newMessages={newMessages}
                  setNewMessages={setNewMessages}
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
