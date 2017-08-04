import React from 'react';
import style from './style.css';

const DetailedResults = ({ data }) => (
  <div className={style.details}>
    <div>
      In details:
    </div>
    <div className={style.half}>
      {data.divident.map(el => (
        <div key={el.number}>{el.name}: {el.number}</div>
      ))}
    </div>
    <div className={style.half}>
      {data.divisor.map(el => (
        <div key={el.number}>{el.name}: {el.number}</div>
      ))}
    </div>
  </div>
);


export default DetailedResults;
