import React, { useState } from 'react'
import Search2 from '../search/search2';
import style from "./mobPreview.module.scss"
const MobMenuPrev = ({t2,mainData,getdata}) => {


  const [d,setD] = useState(t2.data);
  const [text,setText] = useState('');


  return (
    <div className={style.mobPreview}>
        <div className={style.mobPreviewWrapper}>
        <div className={style.title}>
                <span>Topic : C</span>
              </div>

            <Search2  t2={t2} setD={setD} />
              <div className={style.list}>
                {d &&
                  d.map((val, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => getdata(val.id, val.name, index,true)}
                      >
                        {val.id === mainData.id ? (
                          <span className="text-danger">
                            {index + 1}) {val.name}
                          </span>
                        ) : (
                          <span>
                            {index + 1}) {val.name}
                          </span>
                        )}
                      </span>
                    );
                  })}
              </div>
        </div>
    </div>
  )
}

export default MobMenuPrev