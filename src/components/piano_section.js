import React from 'react';
import * as Tone from 'tone'
import { buildNotes, updateChord } from '../helpers/notes.js';
import { KEY_NUMBERS, INITIAL_SETTINGS } from '../constants/init_values.js'
import PianoKeyboard from './piano_keyboard.js';
import PianoDashboard from './piano_dashboard.js'

class PianoSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      player: new Tone.PolySynth({volume: -5}).toDestination(),
      keyboard: {
        root: 0,
        octave: 2,
        scale: 0,
        chord: 0,
        notes: buildNotes(2, KEY_NUMBERS, INITIAL_SETTINGS),
        showNoteLabel: false,
        showKeyLabel: false,
        settings: INITIAL_SETTINGS
      }
    }
  }

  handleUpdateChord(params) {
    const { chordIndex = null, noteIndex = null } = params
    const { keyboard } = this.state
    const { notes, chord, root, octave } = keyboard

    this.setState({ 
      keyboard : { 
        ...keyboard,
        ...(chordIndex !== null && { chord: chordIndex}),
        ...(noteIndex !== null && { root: noteIndex}),  
        notes: updateChord(notes, {
          chordIndex: chordIndex !== null ? chordIndex : chord , 
          noteIndex: noteIndex !== null ? noteIndex : root, 
          octave
        }) 
      }
    })
  }

  render(){
    const { display } = this.props
    const { player, keyboard } = this.state
  
    return (
      <div className="wrapper"> 
        <PianoKeyboard 
          display={display}
          player={player}
          keyboard={keyboard} 
          handleChange={updatedStates => this.setState(updatedStates)}
        />
        <PianoDashboard
          display={display}
          player={player}
          keyboard={keyboard}
          handleUpdateChord={(chordIndex)=>{ this.handleUpdateChord(chordIndex)}} 
        />
      </div>
    ); 
  }
}

export default PianoSection;
