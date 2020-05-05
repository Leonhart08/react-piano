import React from 'react';
import './DashBoard.scss';
import Select from 'react-select';
import { SCALES } from './constants/scales.js';
import { TONES } from './constants/tones.js';


const customStyles = {
   option: (provided, state) => ({
    ...provided,
    padding: '0.75rem',
    letterSpacing: '1px',
  }),
  container: (provided, state) => ({
    ...provided,
    width: '15rem',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0.75rem',
  }),
}

const DashBoard= (props) => {
  const { options, handleUpdate } = props;
  const { root, scale } = options;
  const scaleOptions = SCALES.map((scale) => ({ value: scale.value, label: scale.name })); 
  const keyOptions = TONES.map((scale,index) => ({ value: index, label: scale })); 

  return (
    <div className='DashBoardWrapper'>
      <h3> Options </h3>
      <div className='input-section'>
        <div>
          <h4> Root </h4>
          <Select 
            options={keyOptions}
            value={keyOptions[root]}
            isSearchable={false}
            styles={customStyles}
            onChange={(event) => handleUpdate({...options, root: event.value})}
          />
        </div>
        <div>
          <h4> Scales </h4>
          <Select 
            options={scaleOptions}
            placeholder={'Select scale...'}
            value={scaleOptions.find(option => scale && (option.label === scale.name))}
            isSearchable={false}
            styles={customStyles}
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