import React, { useEffect } from 'react'

export const FamTubeVideoPlayerUser:React.FC<{stream:MediaStream,myVideo:any}>=({stream,myVideo})=>{
    
    useEffect(()=>{
        if(myVideo.current) myVideo.current.srcObject=stream
    },[stream])
    return(
        <div>
            
            <video autoPlay   playsInline ref={myVideo} className="videoPlayer"/>
          
        </div>
    )
}