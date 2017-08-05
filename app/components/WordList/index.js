import React from 'react';
import style from './style.css';

const WordList = ({ data, onChange }) => {
  const onRemove = (e) => {
    const arr = data.filter(item => item !== e);
    onChange(arr);
  };
  const handleBlur = (e) => {
    const value = e.target.value;
    if (!value || data.indexOf(value) > -1) {
      return;
    }
    data.push(value);
    onChange(data);
    e.target.value = '';
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur(e);
    }
  };

  return (
    <div className={style.container}>
      {
        data.map(el => (
          <span className={style.tag} key={el}>{el}
            <span onClick={() => onRemove(el)}> x</span>
          </span>))
      }
      <input placeholder="add new" className={style.tagReversed} onBlur={handleBlur} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default WordList;
