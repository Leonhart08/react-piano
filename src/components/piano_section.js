import React from 'react';
import { buildNotes } from '../helpers/notes.js';
import { KEY_NUMBERS, INITIAL_SETTINGS } from '../constants/init_values.js'
import PianoKeyboard from './piano_keyboard.js';

class PianoSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keyboard: {
        root: null,
        octave: 2,
        scale: null,
        chord: null,
        notes: buildNotes(2, KEY_NUMBERS, INITIAL_SETTINGS),
        showNoteLabel: false,
        showKeyLabel: false,
        settings: INITIAL_SETTINGS
      }
    }
  }

  render(){
    const { keyboard } = this.state
    return (
      <div className="wrapper"> 
        <PianoKeyboard 
          keyboard={keyboard} 
          handleChange={updatedStates => {
            this.setState({ 
              keyboard : { ...keyboard, ...updatedStates }
              }
            )
          }}
        />
      </div>
    ); 
  }
}

export default PianoSection;
