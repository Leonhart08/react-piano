import React from 'react';
import { INSTRUMENTS as instrumentList }  from '../constants/instruments.js';
import { customSelectStyles } from '../constants/custom_select_class.js';
import Select from 'react-select';
import SettingsSlider from './settings_slider.js'

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
    const { instrumentsOptions } = this.state
    const { octave, handleUpdateNotes, handleUpdateSettings, settings } = this.props;
    const { oscillator, envelope } = settings

    return (
      <div className="options-section">
        <div className="wheels-section">
          { Object.entries(envelope).map(([name, values]) => {
            return (
              <SettingsSlider
                key={name}
                name={name}
                values={values} 
                onChange={(target) => { 
                  handleUpdateSettings({
                    ...settings, 
                    envelope: { ...envelope, [name]: { ...envelope[name], current: target }}
                    })
                  }
                }
              />)
            })
          }
        </div>
        <div className="instruments-section">
          <Select 
            options={instrumentsOptions}
            placeholder={'Select scale...'}
            value={instrumentsOptions.find(instrument => (instrument.label === oscillator.type))}
            isSearchable={false}
            styles={customSelectStyles}
            onChange={(event) => handleUpdateSettings({...settings, oscillator: { type : event.value }})}
          />
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