import React, { useState } from "react";
import { MdCallEnd, MdVideocam, MdVideocamOff } from "react-icons/md";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { Button, Header, Message } from "semantic-ui-react";

type afterCallType = {
  leaveCall: () => void;
  mute: boolean;
  setMute: any;
  stream: any;
  offVideo:boolean
  setOffVideo:any
};

function AfterCall({ leaveCall, mute, setMute, stream,setOffVideo,offVideo }: afterCallType) {
  
  const onLeaveCall = () => {
    leaveCall();
  };

  return (
    <div>
      <Header textAlign="center" as="h4">
        <Message color="black" className="videoCallControlsBox">
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

          <Button
            onClick={onLeaveCall}
            size="mini"
            circular
            className="videoControlButtons"
            color="red"
          >
            <MdCallEnd className="afterCallIcons" />
          </Button>
          {offVideo ? (
            <Button size="mini" onClick={()=>{
              setOffVideo(false)
              stream.getTracks()[1].enabled = true;
            }} circular className="videoControlButtons" color="red">
              <MdVideocamOff className="afterCallIcons" />
            </Button>
          ) : (
            <Button size="mini" onClick={()=>{
              setOffVideo(true)
              stream.getTracks()[1].enabled = false;
            }} circular className="videoControlButtons">
              <MdVideocam className="afterCallIcons" />
            </Button>
          )}
          
        </Message>
      </Header>
    </div>
  );
}

export default AfterCall;
