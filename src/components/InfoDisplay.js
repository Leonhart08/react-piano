import React from 'react';
import { TONES } from '../constants/tones.js';

const InfoDisplay= (props) => {
  const { options } = props;
  const { currentDisplay, root } = options;
  const displayName = currentDisplay.slice(0, -1);
  const display = options[displayName];

  const getTitle = name => (
    <div className='title-section'>
      <h2>{`${TONES[root]} ${name}`}</h2>
    </div>
  );

  const getNotes = (values) => (
    <div className='scale-section'>
      <span>{`${currentDisplay} notes :`}</span>
      {values.map(value => <span>{`${TONES[value]}`}</span>)} 
    </div>
  );

  const getNotesPlaceHolder = (values) => (
    <div className='scale-section-placeholder'>
      <span>{`Select a ${displayName}`}</span>
    </div>
  );

  return (
    <div className='info-wrapper'>
      <div className='title-section'>
        {display && getTitle(display.name)}
      </div>
        {display ? getNotes(display.values) : getNotesPlaceHolder()}
    </div>
  );
}

export default InfoDisplay;