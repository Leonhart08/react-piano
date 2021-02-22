import React from 'react';
import * as Tone from 'tone'
import { TONES } from '../../constants/tones'
import { SCALES } from '../../constants/scales'
import Play from './../icons/play'
import { getScaleFrequencies, getScaleNotes } from '../../helpers/notes'

class ScalesDashboard extends React.Component {
  constructor(props){
    super(props)

    this.playNote = this.playNote.bind(this)
  }
  
  playNote(){
    const { player, keyboard } = this.props
    const { scale, root, octave } = keyboard
    const chordFreq = getScaleFrequencies(root, scale, octave )
    const now = Tone.now()

    chordFreq.map((freq, index) => {
      player.triggerAttackRelease(freq, 0.5, now + index/2)
    })
    //player.triggerRelease(chordFreq, now + chordFreq.length/2  );
  }

  render(){
    const { keyboard, handleUpdateScale } = this.props
    const { root: noteIndex, scale: scaleIndex } = keyboard

    return (
      <React.Fragment>
        <div className="chord-label-section">
          <div className="chord-label">
            {TONES[noteIndex]} {(scaleIndex !== null) && SCALES[scaleIndex].name}
          </div>
          <div className="chord-play-button">
            <Play onClick={() => { this.playNote()}}/>
          </div>
        </div>
        <div className="chord-notes-section">
          <div className="notes-label">
            <span>{`[ ${ getScaleNotes(noteIndex, scaleIndex) } ]`}</span>
          </div>
        </div>
        <div className="notes-list-section">
          <div className="notes-list-label"> tone </div>
          <div className="notes-list-options"> 
            {TONES.map((tone, index) => {
              return( 
                <div 
                  className={`list-item ${noteIndex === index ? 'list-item--active' : ''}`} 
                  onClick={()=> { handleUpdateScale({ noteIndex: index }) }} 
                >
                  { tone } 
                </div>)
            })}
          </div>
        </div>

        <div className="chords-list-section">
          <div className="chords-list-label"> scale </div>
          <div className="chords-list-options">
            {(noteIndex !== null) && SCALES.map((scale, index) => {
              return ( <div 
                className={`list-item ${scaleIndex === index ? 'list-item--active' : ''}`} 
                onClick={()=> { handleUpdateScale({ scaleIndex: index}) }} >
                  {` ${scale.name} `}
                </div>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    ); 
  }
}

export default ScalesDashboard;
