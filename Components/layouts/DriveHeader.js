import React from 'react'
import style from "../styles/driveheader.module.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const DriveHeader = ({length,back}) => {
  return (
   <div className={style.driveNav}>
    <div className={style.driveNavWrapper}>
    <div className={style.left}>
      
          {length-1>0 && <button onClick={back}><ArrowBackIcon  className={style.back}/></button>}
            <span>Filemanager</span>
        {/* </div> */}
    </div>
    <div className={style.right}>
     <Link href="/"><button>Home</button></Link>
    </div>
    </div>
   </div>
  )
}

export default DriveHeader
