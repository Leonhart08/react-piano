import React from 'react';
import Select from 'react-select';
import { CHORDS } from '../constants/chords.js';
import { TONES } from '../constants/tones.js';

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

const ChordsDashBoard= (props) => {
  const { options, handleUpdate } = props;
  const { root, chord } = options;
  const chordsOptions = CHORDS.map((chord) => ({ value: chord.value, label: chord.name })); 
  const keyOptions = TONES.map((tone, index) => ({ value: index, label: tone })); 

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
          <h4> Chords </h4>
          <Select 
            options={chordsOptions}
            placeholder={'Select Chord...'}
            value={chordsOptions.find(option => chord && (option.label === chord.name))}
            isSearchable={false}
            styles={customStyles}
            onChange={(event) => handleUpdate({...options, chord: { name: event.label , values: event.value}})}
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

export default ChordsDashBoard;