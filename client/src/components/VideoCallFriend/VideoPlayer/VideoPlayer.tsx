import React, { useEffect } from 'react'

export const VideoPlayer:React.FC<{stream:MediaStream,mute:boolean,myVideo:any}>=({stream,mute,myVideo})=>{
    
    useEffect(()=>{
        if(myVideo.current) myVideo.current.srcObject=stream
    },[stream])
    return(
        <div>
            
            <video autoPlay   playsInline ref={myVideo} className="videoPlayer"/>
          
        </div>
    )
}