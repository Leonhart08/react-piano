import React from 'react';
import Modal from 'react-modal';

import PianoKey from './piano_key.js';
import PianoSettings from './piano_settings.js';
import Settings from './icons/settings'

import { updateNotes } from '../helpers/notes.js';

class PianoKeyboard extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      settingsModal: false,
      responsive: this.getWindowsSize()
    }

    this.playNote = this.playNote.bind(this)
    this.stopNote = this.stopNote.bind(this)
    this.sliceNotes = this.sliceNotes.bind(this)
    this.mapKeyToIndex = this.mapKeyToIndex.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleActiveNote = this.toggleActiveNote.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleUpdateNotes = this.handleUpdateNotes.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => !event.repeat ? this.handleKeyDown(event) : null);
    window.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('resize', e => this.setState({ responsive: this.getWindowsSize() }));
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  getWindowsSize() {
    if(window.matchMedia("(min-width: 1200px)").matches) return 'desktop'
    if(window.matchMedia("(min-width: 600px)").matches) return 'tablet'
    return 'mobile'
  }

  sliceNotes(){
    const { responsive } = this.state
    if(responsive === 'desktop') return 0
    if(responsive === 'tablet' ) return 5
    return 11
  }

  toggleActiveNote(currentNote) {
    const { notes, keyboard, handleChange } = this.props

    handleChange({
      keyboard: { ...keyboard},
      notes: notes.map(note => ({
        ...note, 
        ...(note.label === currentNote.label && { active: !note.active })
        }))
    });
  }

  handleKeyDown(event) {
    const { display } = this.props;
    const currentNote = this.mapKeyToIndex(event.key)

    if(currentNote){
      this.toggleActiveNote(currentNote)
      this.playNote(currentNote)
    }
  }

  handleKeyUp(event) {
    const { display } = this.props;
    const currentNote = this.mapKeyToIndex(event.key);

    if(currentNote){
      this.toggleActiveNote(currentNote)
      this.stopNote(currentNote)
    }
  }

  handleClick(note) {
    const { display } = this.props;
    const { synth, frequency } = note
    return display === 'piano' && synth.triggerAttackRelease(frequency, '4n')
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
    const { notes } = this.props
    return notes.find(note => key === note.keyMap);
  }

  handleUpdateNotes(octave){
    const { keyboard, notes, handleChange } = this.props;

    return handleChange({
      notes: updateNotes(notes, octave),
      keyboard: {
        ...keyboard,
        octave: octave,
      }
    });
  }

  render() {
    const { responsive, settingsModal } = this.state
    const { display, keyboard, notes } = this.props;
    const { octave, settings, showNoteLabel, showKeyLabel } = keyboard;

    return (
      <div className="container">
        <div className="left-border"></div>
          {responsive === 'desktop' && 
            (<PianoSettings
              display={display} 
              octave={octave}
              settings={settings}
              handleUpdateNotes={this.handleUpdateNotes}
            />)
          }
          <Modal
              isOpen={settingsModal}
              onRequestClose={() => { this.setState({ settingsModal: false })}}
              style={{
                overlay: {
                  zIndex: 5,
                  backgroundColor: 'rgba(53,53,53,0.75)'
                },
                content : {
                  top                   : '50%',
                  left                  : '50%',
                  right                 : 'auto',
                  bottom                : 'auto',
                  marginRight           : '-50%',
                  paddingBottom         : '43px',
                  transform             : 'translate(-50%, -50%)',
                  backgroundColor: '#353535',
                }
              }}
              contentLabel="Example Modal"
            >
              <div>
                <PianoSettings
                  display={display} 
                  octave={octave}
                  settings={settings}
                  handleUpdateNotes={this.handleUpdateNotes}
                />
              </div>
          </Modal>
        <div className="piano-section">
          <div className="top-section">
            {responsive !== 'desktop' && 
              <div className="settings-button">
                <Settings onClick={() => { this.setState({ settingsModal: true })}} />
              </div>
            }
          </div>
          <div className="notes-section">
            {notes.slice(this.sliceNotes()).map((note,index) => {
              return(
                <div key={index}>
                  <PianoKey
                    display={display} 
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