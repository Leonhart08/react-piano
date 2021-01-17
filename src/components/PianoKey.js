import React from 'react';

const getKeyStyle = (note) => {
  const keyColor = note.label.includes('#') ? 'black-key-style' : 'white-key-style'; 
  const isActive = note.active ? 'key-active' : '';
  return `key ${ keyColor } ${isActive}`;
}

const PianoKey= (props) => {
  const { 
    note,
    handleClick 
  } = props;
  
  return (
    <div className='keyWrapper'>
      <div className={getKeyStyle(note)} onClick={() => {handleClick(note)}} />
    </div>
  );
}



export default PianoKey;