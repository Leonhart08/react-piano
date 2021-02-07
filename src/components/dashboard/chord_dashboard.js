import React from 'react';
import { TONES } from '../../constants/tones'
import { CHORDS } from '../../constants/chords'
import Play from './../icons/play'
import { getChordFrequencies, getChordNotes } from '../../helpers/notes'

class ChordDashboard extends React.Component {
  constructor(props){
    super(props)

    this.playNote = this.playNote.bind(this)
  }
  
  playNote(){
    const { player, keyboard } = this.props
    const { chord, root, octave } = keyboard
    const chordFreq = getChordFrequencies(root, chord, octave )

    player.triggerAttackRelease(chordFreq, 1);
  }

  render(){
    const { keyboard, handleUpdateChord } = this.props
    const { root: noteIndex, chord: chordIndex } = keyboard

    return (
      <React.Fragment>
        <div className="chord-label-section">
          <div className="chord-label">
            {TONES[noteIndex]} {(chordIndex !== null) && CHORDS[chordIndex].name}
          </div>
          <div className="chord-play-button">
            <Play onClick={() => { this.playNote()}}/>
          </div>
        </div>
        <div className="chord-notes-section">
          <div className="notes-label">
            <span>{`[ ${ getChordNotes(noteIndex, chordIndex) } ]`}</span>
          </div>
        </div>
        <div className="notes-list-section">
          <div className="notes-list-label"> tone </div>
          <div className="notes-list-options"> 
            {TONES.map((tone, index) => {
              return( 
                <div 
                  className={`list-item ${noteIndex === index ? 'list-item--active' : ''}`} 
                  onClick={()=> { handleUpdateChord({ noteIndex: index }) }} 
                >
                  { tone } 
                </div>)
            })}
          </div>
        </div>

        <div className="chords-list-section">
          <div className="chords-list-label"> chord </div>
          <div className="chords-list-options">
            {(noteIndex !== null) && CHORDS.map((chord, index) => {
              return ( <div 
                className={`list-item ${chordIndex === index ? 'list-item--active' : ''}`} 
                onClick={()=> { handleUpdateChord({ chordIndex: index}) }} >
                  {`${TONES[noteIndex]}${chord.suffix}`}
                </div>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    ); 
  }
}

export default ChordDashboard;
