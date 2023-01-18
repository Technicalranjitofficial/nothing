import React from 'react'

import style from "../styles/videoplayer.module.scss"

const Video = ({id,clearId}) => {
    // const 
  return (
    <div className={style.video}>
      
            <video muted={false} src={`https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=AIzaSyCdVB-50SIiRTLwDDuwuHgtEPR-eEopMls`} controls></video>
            {/* <button onClick={()=>clearId()}>Close</button> */}
    </div>
  )
}

export default Video
