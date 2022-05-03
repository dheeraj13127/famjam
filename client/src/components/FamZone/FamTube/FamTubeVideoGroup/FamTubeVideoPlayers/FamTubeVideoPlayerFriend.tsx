import React, { useEffect, useRef } from 'react'

export const FamTubeVideoPlayerFriend:React.FC<{peer:any}>=({peer})=>{
    const fRef=useRef<any>()
    useEffect(()=>{
        peer.on("stream",(stream:MediaStream)=>{
            if(fRef.current){
                fRef.current.srcObject=stream
            }
                
        })
    },[])
    
    return(
        <div>
            
            <video autoPlay   playsInline ref={fRef}  className="videoPlayer"/>
            <p>Lol</p>
        </div>
    )
}