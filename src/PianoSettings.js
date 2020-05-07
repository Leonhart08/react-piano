import React from 'react';
import { INSTRUMENTS as instrumentList }  from './constants/instruments.js';
import Select from 'react-select';
import './PianoSettings.scss';

const GREEN = "#76FF03";
const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '15rem',
    borderRadius: '3px',
    backgroundColor: 'black',
  }),

  option: (provided, state) => ({
    ...provided,
    padding: '0.75rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    backgroundColor: '#101010',
    color: GREEN,
    fontSize: '10px',
    cursor: 'pointer',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0.75rem',
    fontFamily: 'monospace', 
    backgroundColor: '#101010',
    paddingRight: '0px',
    paddingLeft: '0.75rem',
    cursor: 'pointer',
  }),
  singleValue: (provided, state) => ({
    color: GREEN,
    fontSize: '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  }),
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    borderRadius: '3px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    backgroundColor: '#101010',
    border: '0px solid black',
    color: GREEN,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    backgroundColor: 'black',
    border: '0px solid black',
    cursor: 'pointer',
    color: GREEN,
  }),
  
}


class PianoSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentsOptions: instrumentList.map(instrument => ({ 
        value: instrument, 
        label: instrument 
      })
    )}
  }

  render() {
    const { octave, instrumentName, handleUpdate } = this.props;
    const { instrumentsOptions } = this.state;
    return (
      <div className="options-section">
        <div className="wheels-section">
          <div className="wheel-item"></div>
          <div className="wheel-item"></div>
        </div>
        <div className="instruments-section">
          <Select 
            options={instrumentsOptions}
            placeholder={'Select scale...'}
            value={instrumentsOptions.find(instrument => (instrument.label === instrumentName))}
            isSearchable={false}
            styles={customStyles}
            onChange={(event) => handleUpdate({ instrumentName: event.label })}
          />
        </div>
        <div className="buttons-section">
          <div 
            className={`button-item button-status-${2 - octave }`}
            onClick={() => { octave > 0 && handleUpdate({ octave: octave - 1 })}}
          >
          </div>
          <div className="button-light"></div>
          <div 
            className={`button-item button-status-${octave - 2}`}
            onClick={() => { octave < 4 && handleUpdate({ octave: octave + 1 })}}
          >
          </div>
        </div>
      </div>
      );
    }
}

export default PianoSettings;