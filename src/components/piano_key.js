import React from 'react';

const getKeyStyle = props => {
  const { note, display } = props

  const keyColor = note.label.includes('#') ? 'black-key-style' : 'white-key-style'
  const keyStatus = display !== 'piano' && note.status === 'highlight' ? 'key-highlight' : '';
  const isEnabled = display === 'piano' ? 'key-enabled' : ''
  const isActive = note.active ? 'key-active' : ''
  
  return `key ${ isEnabled } ${ keyColor } ${ keyStatus } ${ isActive }`
}

const PianoKey= props => {
  const { note, handleClick } = props

  return (
    <div className='keyWrapper'>
      <div className={getKeyStyle(props)} onClick={() => {handleClick(note)}}>
        <span>{note.label}</span>
      </div>
    </div>
  );
}

export default PianoKey;