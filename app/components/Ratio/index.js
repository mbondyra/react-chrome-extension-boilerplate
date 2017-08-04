import React from 'react';

import style from './style.css';

const Ratio = ({ data }) => (
  <div className={style.ratio}>
    <div>RATIO:</div>
    <div className={style.number}>
      {data}
    </div>
  </div>
);


export default Ratio;
