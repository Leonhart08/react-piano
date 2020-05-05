import React from 'react';
import { TONES } from './constants/tones.js';
import './InfoDisplay.scss';

const InfoDisplay= (props) => {
  const { options } = props;
  const { root, scale } = options;
  const { name, values } = scale;

  return (
    <div className='info-wrapper'>
      <div className='title-section'>
        <h2>{name && `${TONES[root]} ${name}`} </h2>
      </div>
      <div className='scale-section'>
      { values && values.map(value => {
        return(
          <span>
            {TONES[(root + value)%12]}
          </span>
        )}
      )
      }
      </div>
    </div>
  );
}

export default InfoDisplay;