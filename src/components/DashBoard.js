import React from 'react';
import RootSelector from './RootSelector.js';
import Select from 'react-select';
import { SCALES } from '../constants/scales.js';
import { TONES } from '../constants/tones.js';

const DashBoard= (props) => {
  const { options, handleUpdate } = props;
  const { root, scale } = options;
  const scaleOptions = SCALES.map((scale) => ({ value: scale.value, label: scale.name })); 
  const keyOptions = TONES.map((scale,index) => ({ value: index, label: scale })); 

  return (
    <div className='DashBoardWrapper'>
      <h3> Options </h3>
      <div className='input-section'>
        <RootSelector
          selected={keyOptions[root]} 
          handleChange={event => handleUpdate({...options, root: event.value})}
        />
        <div>
          <h4> Scales </h4>
          <Select 
            options={scaleOptions}
            placeholder={'Select scale...'}
            value={scaleOptions.find(option => scale && (option.label === scale.name))}
            isSearchable={false}
            onChange={(event) => handleUpdate({...options, scale: { name: event.label , values: event.value}})}
          />
        </div>
      </div>
      <div className='checkbox-section'>
        <div className='checkbox-item'>
          <div
            className={`checkbox ${options.showNoteLabel ? 'checked' :''}`} 
            onClick={(event) => handleUpdate({...options, showNoteLabel: !options.showNoteLabel})}> 
          </div>
          <label> 
            show note labels 
          </label>
        </div>
        <div className='checkbox-item'>
          <div
            className={`checkbox ${options.showKeyLabel ? 'checked' :''}`} 
            onClick={(event) => handleUpdate({...options, showKeyLabel: !options.showKeyLabel})}> 
          </div>
          <label> show keyboard labels </label>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;