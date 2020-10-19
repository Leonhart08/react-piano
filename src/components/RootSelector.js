import React from 'react';
import Select from 'react-select';
import { TONES } from '../constants/tones.js';

const RootSelector= (props) => {
  const { selected, handleChange } = props;
  const keyOptions = TONES.map((scale,index) => ({ value: index, label: scale }));

  const getRootStatus = key => key.label === selected.label ? 'active' : '';
  return (
    <div>
      <h4> Root </h4>
      <div className='roots-wrapper'>
        {keyOptions.map((key, index) =>{
          return(
            <div className={`roots-item ${getRootStatus(key)}`} onClick={()=>{handleChange(key)}}>
              <span>{key.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default RootSelector;