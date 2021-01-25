import React from 'react';
import { updateNotes, updateNotesSynth } from '../helpers/notes.js';
import PianoKey from './piano_key.js';
import PianoSettings from './piano_settings.js';

class PianoKeyboard extends React.Component {
  constructor(props){
    super(props);

    this.playNote = this.playNote.bind(this)
    this.stopNote = this.stopNote.bind(this)
    this.mapKeyToIndex = this.mapKeyToIndex.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleActiveNote = this.toggleActiveNote.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleUpdateNotes = this.handleUpdateNotes.bind(this)
    this.handleUpdateSettings = this.handleUpdateSettings.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => !event.repeat ? this.handleKeyDown(event) : null);
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  toggleActiveNote(currentNote) {
    const { keyboard, handleChange } = this.props
    const { notes } = keyboard

    handleChange({
      notes: notes.map(note => ({
        ...note, 
        ...(note.label === currentNote.label && { active: !note.active })
        })
      )}
    );
  }

  handleKeyDown(event) {
    const currentNote = this.mapKeyToIndex(event.key)

    if(currentNote){
      this.toggleActiveNote(currentNote)
      this.playNote(currentNote)
    }
  }

  handleKeyUp(event) {
    const currentNote = this.mapKeyToIndex(event.key);

    if(currentNote){
      this.toggleActiveNote(currentNote)
      this.stopNote(currentNote)
    }
  }

  handleClick(note) {
    const { synth, frequency } = note
    return synth.triggerAttackRelease(frequency, '4n')
  }

  playNote(note) {
    const { synth } = note
    return synth.triggerAttack(note.frequency)
  }

  stopNote(note) {
    const { synth } = note;
    return synth.triggerRelease()
  }

  mapKeyToIndex(key){
    const { keyboard } = this.props
    const { notes } = keyboard
    return notes.find(note => key === note.keyMap);
  }

  handleUpdateNotes(octave){
    const { keyboard, handleChange } = this.props;
    const { notes } = keyboard

    return handleChange({
      octave: octave,
      notes: updateNotes(notes, octave)
    });
  }

  handleUpdateSettings(settings){
    const { keyboard, handleChange } = this.props;
    const { notes } = keyboard

    return handleChange({
      notes: updateNotesSynth(notes, settings),
      settings: settings,
    });
  }

  render() {
    const { keyboard } = this.props;
    const { octave, notes, settings, showNoteLabel, showKeyLabel } = keyboard;

    return (
      <div className="container">
        <div className="left-border"></div>
        <PianoSettings 
          octave={octave}
          settings={settings}
          handleUpdateNotes={this.handleUpdateNotes}
          handleUpdateSettings={this.handleUpdateSettings}
        />
        <div className="piano-section">
          <div className="top-section"/>
          <div className="notes-section">
            {notes.map((note,index) => {
              return(
                <div key={index}>
                  <PianoKey 
                    note={note}
                    showNoteLabel={showNoteLabel}
                    showKeyLabel={showKeyLabel}
                    handleClick={this.handleClick} 
                  />
                </div>
                )
              })
            }
          </div>
          <div className="bottom-section"/>
        </div>
        <div className="right-border"/>
      </div>
      );
    }
}

export default PianoKeyboard;