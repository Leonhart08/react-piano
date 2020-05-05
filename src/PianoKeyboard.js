import React from 'react';
import { loadInstrument ,buildNotes } from './helpers/notes.js';
import { isEqual } from 'lodash';
import './PianoKeyboard.scss';
import PianoKey from './PianoKey.js';
const KEYNUMBERS = 36;

class PianoKeyboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      octave: 2,
      notes: buildNotes(2, KEYNUMBERS, props.options),
      instrument: null,
      activeNotes: [],
    }
    this.playNote = this.playNote.bind(this);
    this.mapKeyToIndex = this.mapKeyToIndex.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    loadInstrument().then(instrument => this.setState({instrument: instrument}));
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate(prevProps){
    const { options: prevOptions } = prevProps;
    const { options } = this.props;
    const { octave } = this.state;
    if(!isEqual(prevOptions,options)) this.setState({notes: buildNotes(octave, KEYNUMBERS, options)})
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
    return note ? this.playNote(note) : null;
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
  }

  playNote(note) {
    const { instrument } = this.state;
    return instrument && instrument.play(note.label);
  }

  mapKeyToIndex(key){
    const { notes } = this.state;
    return notes.find(note => key === note.keyMap);
  }

  render() {
    const { options } = this.props;
    const {octave, notes} = this.state;
    return (
      <div className="container">
        <div className="left-border"></div>
        <div className="options-section">
          <div className="wheels-section">
            <div className="wheel-item"></div>
            <div className="wheel-item"></div>
          </div>
          <div className="buttons-section">
            <div 
              className={`button-item button-status-${2 - octave }`}
              onClick={() => { octave > 0 && this.setState({
                octave: octave - 1,
                notes: buildNotes(octave - 1, KEYNUMBERS, options)
              })}}
            >

            </div>
            <div className="button-light"></div>
            <div 
              className={`button-item button-status-${octave - 2}`}
              onClick={() => { octave < 4 && this.setState({
                octave: octave + 1,
                notes: buildNotes(octave + 1, KEYNUMBERS, options)
              })}}
            >
            </div>
          </div>
        </div>
        <div className="piano-section">
          <div className="top-section"><div></div></div>
          <div className="notes-section">
            {notes.map((note,index) => {
              return(
                <div key={index}>
                  <PianoKey 
                    options={options}
                    note={note}
                    handleClick={this.playNote} 
                  />
                </div>
                )
              })
            }
          </div>
          <div className="bottom-section"></div>
        </div>
        <div className="right-border"></div>
      </div>
      );
    }
}

export default PianoKeyboard;