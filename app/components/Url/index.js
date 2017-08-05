import React from 'react';

import style from './style.css';

const Url = ({url, onChange}) => {
  const onInputChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <span>URL: </span>
      <input disabled className={style.input} value={url} onChange={onInputChange} />
    </div>
  );
};


export default Url;
