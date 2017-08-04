import React from 'react';
import style from './style.css';

const Divisor = ({ data, onChange }) => (
  <div className={style.container}>
    {
      data.map(el => (
        <span className={style.tag} key={el}>
          {el}<span onClick={() => onChange(el)}> x</span>
        </span>))
    }
    <span className={style.tagReversed}>+</span>
  </div>
);


export default Divisor;
