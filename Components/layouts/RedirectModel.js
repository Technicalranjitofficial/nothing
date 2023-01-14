import React from 'react'
import style from "../layouts/redirect.module.scss";
const RedirectModel = () => {
  return (
    <div className={style.redirect}>
        <div className={style.redirectWrapper}>
            <span>Please wait while we are redirecting...</span>
        </div>
    </div>
  )
}

export default RedirectModel
