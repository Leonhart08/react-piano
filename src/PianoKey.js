import React from 'react';
import './PianoKey.scss';

const PianoKey= (props) => {
  const { 
    options, 
    note, 
    handleClick 
  } = props;
  const isBlackKey = note.label.includes('#');
  return (
    <div className='keyWrapper'>
      <div 
        className={`key ${ !isBlackKey ? 'white-key-style' : 'black-key-style'} ${(note.status === 'highlight') ? 'key-highlight' : ''} ${note.active ? 'key-active' : ''}`}
        onClick={() => {handleClick(note)}}
      >
        <span style={{opacity: 0.6}}>{options.showKeyLabel && note.keyMap}</span>
        <span style={{fontWeight: 'bold'}}>{options.showNoteLabel && note.label}</span>
      </div>
    </div>
  );
}

export default PianoKey;