import React from 'react';

class PianoSettings extends React.Component {S
  render() {
    const { octave, handleUpdate } = this.props;

    return (
      <div className="options-section">
        <div className="wheels-section">
          <div className="wheel-item"/>
          <div className="wheel-item"/>
        </div>
        <div className="instruments-section">
          <div className="instrument-select">
            {/* TODO: Handle multiple instrument selection */}
            <span> Synth </span>
          </div>
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