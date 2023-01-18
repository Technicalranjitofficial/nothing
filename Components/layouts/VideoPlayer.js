import React from 'react'
import style from "../styles/videoplayer.module.scss"
import Video from './video'
import CloseIcon from '@mui/icons-material/Close';
const VideoPlayer = ({id,cancel}) => {
  return (
    <div className={style.videoplayer}  >
          <button onClick={cancel}><CloseIcon  className={style.cancelBtn}  /></button> 
     <Video id={id}/>
    
    </div>
  )
}

export default VideoPlayer
