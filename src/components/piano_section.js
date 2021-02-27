import React from 'react';
import { getSampler, buildNotes, updateChord, updateScale } from '../helpers/notes.js';
import { KEY_NUMBERS } from '../constants/init_values.js'
import PianoKeyboard from './piano_keyboard.js';
import PianoDashboard from './piano_dashboard.js'

class PianoSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      player: getSampler(),
      notes: buildNotes(2, KEY_NUMBERS),
      keyboard: {
        root: 0,
        octave: 2,
        scale: 0,
        chord: 0,
        showNoteLabel: false,
        showKeyLabel: false,
      }
    }
  }

  handleUpdateChord(params) {
    const { chordIndex = null, noteIndex = null } = params
    const { keyboard, notes } = this.state
    const { chord, root, octave } = keyboard

    this.setState({ 
      keyboard : { 
        ...keyboard,
        ...(chordIndex !== null && { chord: chordIndex}),
        ...(noteIndex !== null && { root: noteIndex}),  
      },
      notes: updateChord(notes, {
        noteIndex: noteIndex !== null ? noteIndex : root, 
        chordIndex: chordIndex !== null ? chordIndex : chord, 
        octave
      }) 
    })
  }

  handleUpdateScale(params) {
    const { noteIndex = null, scaleIndex = null } = params
    const { keyboard, notes } = this.state
    const { scale, root, octave } = keyboard

    this.setState({ 
      keyboard : { 
        ...keyboard,
        ...(scaleIndex !== null && { scale: scaleIndex}),
        ...(noteIndex !== null && { root: noteIndex}),  
      },
      notes: updateScale(notes, {
        noteIndex: noteIndex !== null ? noteIndex : root, 
        scaleIndex: scaleIndex !== null ? scaleIndex : scale,
        octave
      }) 
    })
  }

  render(){
    const { display } = this.props
    const { player, keyboard, notes } = this.state
    
    return (
      <div className="wrapper"> 
        <PianoKeyboard 
          display={display}
          player={player}
          keyboard={keyboard}
          notes={notes} 
          handleChange={updatedStates => this.setState(updatedStates)}
        />
        <PianoDashboard
          display={display}
          player={player}
          keyboard={keyboard}
          notes={notes} 
          handleUpdateChord={(params) =>{ this.handleUpdateChord(params)}} 
          handleUpdateScale={(params) =>{ this.handleUpdateScale(params)}}
        />
      </div>
    ); 
  }
}

export default PianoSection;
