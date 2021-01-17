import React from 'react';
import { buildNotes } from '../helpers/notes.js';
import { isEqual } from 'lodash';
import PianoKey from './PianoKey.js';
import PianoSettings from './PianoSettings.js';

const KEYNUMBERS = 36;

class PianoKeyboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      octave: 2,
      notes: buildNotes(2, KEYNUMBERS, props.options),
      instrumentName: 'synth',
      activeNotes: [],
    }

    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
    this.mapKeyToIndex = this.mapKeyToIndex.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => !event.repeat ? this.handleKeyDown(event) : null);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate(prevProps, prevState){
    const { options: prevOptions } = prevProps;
    const { options } = this.props;
    const { octave } = this.state;

    if(!isEqual(prevOptions, options)) {
      this.setState({notes: buildNotes(octave, KEYNUMBERS, options)})
    }
  }
  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(event) {
    const { notes } = this.state;
    const note = this.mapKeyToIndex(event.key);
    this.setState({
      notes: notes.map(n => ({
        ...n, 
        ...(note && (n.label === note.label) && {active: true})
        })
      )}
    );
    return note && this.playNote(note)
  }

  handleKeyUp(event) {
    const { notes } = this.state;
    const note = this.mapKeyToIndex(event.key);
    this.setState({
      notes: notes.map(n => ({
        ...n, 
        ...(note && (n.label === note.label) && {active: false})
        })
      )}
    );
    return note && this.stopNote(note)
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
    const { notes } = this.state;
    return notes.find(note => key === note.keyMap);
  }

  handleSettingsUpdate(updatedSettings){
    const { options } = this.props;
    const { octave} = updatedSettings;

    return this.setState({
      ...(octave && { octave }),
      ...(octave && {notes: buildNotes(octave, KEYNUMBERS, options)}),
    });
  }

  render() {
    const { options } = this.props;
    const {octave, notes, instrumentName} = this.state;

    return (
      <div className="container">
        <div className="left-border"></div>
        <PianoSettings 
          octave={octave}
          instrumentName={instrumentName}
          handleUpdate={this.handleSettingsUpdate}
        />
        <div className="piano-section">
          <div className="top-section"/>
          <div className="notes-section">
            {notes.map((note,index) => {
              return(
                <div key={index}>
                  <PianoKey 
                    note={note}
                    showNoteLabel={options.showNoteLabel}
                    showKeyLabel={options.showKeyLabel}
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