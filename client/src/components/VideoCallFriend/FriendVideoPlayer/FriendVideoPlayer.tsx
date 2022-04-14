import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Image } from "semantic-ui-react";
import { famReducerState } from "../../../redux/reducers";

export const FriendVideoPlayer: React.FC<{
  stream: MediaStream;
  friendVideo: any;
  offVideo: boolean;
  friendStream: MediaStream;
}> = ({friendVideo,friendStream }) => {
  const friendData = useSelector<
    famReducerState,
    famReducerState["videoCallFriendData"]
  >((state) => state.videoCallFriendData);
  useEffect(() => {
    if (friendVideo.current) friendVideo.current.srcObject = friendStream;
  }, [friendStream]);
 
  return (
    <div>
      <video autoPlay playsInline ref={friendVideo} className="videoPlayer" />
     
    </div>
  );
};
