import React from 'react';

const getKeyStyle = (note) => {
  const keyColor = note.label.includes('#') ? 'black-key-style' : 'white-key-style'
  const isActive = note.active ? 'key-active' : ''
  
  return `key ${ keyColor } ${isActive}`
}

const PianoKey= (props) => {
  const { note, handleClick } = props;
  
  return (
    <div className='keyWrapper'>
      <div className={getKeyStyle(note)} onClick={() => {handleClick(note)}}>
        <span>{note.label}</span>
      </div>
      
    </div>
  );
}



export default PianoKey;