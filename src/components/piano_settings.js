import React from 'react';
import { INSTRUMENTS as instrumentList }  from '../constants/instruments.js';
import { customSelectStyles } from '../constants/custom_select_class.js';
import Select from 'react-select';

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
    const { octave, handleUpdateNotes } = this.props;

    return (
      <div className="options-section">
        <div className="wheels-section">
          <div className="wheel-item"/>
          <div className="wheel-item"/>
        </div>
        <div className="instruments-section">
          Piano
        </div>
        <div className="buttons-section">
          <div 
            className={`button-item button-status-${2 - octave }`}
            onClick={() => { octave > 0 && handleUpdateNotes(octave - 1 )}}
          >
          </div>
          <div className="button-light"></div>
          <div 
            className={`button-item button-status-${octave - 2}`}
            onClick={() => { octave < 4 && handleUpdateNotes(octave + 1 )}}
          >
          </div>
        </div>
      </div>
      );
    }
}

export default PianoSettings;