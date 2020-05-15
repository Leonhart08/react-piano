import React from 'react';
import PropTypes from 'prop-types';
import PianoKeyboard from './PianoKeyboard.js';
import DashBoard from './DashBoard.js';
import ChordsDashBoard from './ChordsDashBoard.js';
import InfoDisplay from './InfoDisplay.js';
import Header from './Header.js';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options:{
        currentDisplay: 'scales',
        root: 0,
        scale: null,
        chord: null,
        showNoteLabel: false,
        showKeyLabel: false,
      }
    }
  }
  render(){
    const { options } = this.state;
    return (
      <div className="app">
        <Header
          current={options.currentDisplay}  
          handleClick={(display) => {this.setState(
            { options: {
              ...options, 
              currentDisplay: display,
              root: 0,
              scale: null,
              chord: null, 
            } 
          })
        }}
        />
        <div className="wrapper"> 
          <InfoDisplay
            options={options}
          />
          <PianoKeyboard 
            options={options}
          />
          {options.currentDisplay === 'scales'
            && (
            <DashBoard
              options={options}
              handleUpdate={(updatedOptions) => {
                this.setState({options: updatedOptions})
              }}
            />)
          }
          {options.currentDisplay === 'chords'
            && (
            <ChordsDashBoard
              options={options}
              handleUpdate={(updatedOptions) => {
                this.setState({options: updatedOptions})
              }}
            />)
          }
        </div>
      </div>
    ); 
  }
}

export default App;
