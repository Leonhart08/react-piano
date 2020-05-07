import React, { memo } from 'react';
import { isEqual } from 'lodash';
import './PianoKey.scss';

const arePropsEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps); 

const getKeyStyle = (note) => {
  const keyColor = note.label.includes('#') ? 'black-key-style' : 'white-key-style'; 
  const keyStatus = note.status === 'highlight' ? 'key-highlight' : '';
  const isActive = note.active ? 'key-active' : '';
  return `key ${ keyColor } ${ keyStatus } ${isActive}`;
}

const PianoKey= (props) => {
  const { 
    note,
    showKeyLabel,
    showNoteLabel, 
    handleClick 
  } = props;
  
  return (
    <div className='keyWrapper'>
      <div  className={getKeyStyle(note)} onClick={() => {handleClick(note)}}>
        <span style={{opacity: 0.6}}>{showKeyLabel && note.keyMap}</span>
        <span style={{fontWeight: 'bold'}}>{showNoteLabel && note.label}</span>
      </div>
    </div>
  );
}



export default memo(PianoKey, arePropsEqual);