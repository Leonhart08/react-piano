import React from 'react';
import PropTypes from 'prop-types';
import PianoKeyboard from './PianoKeyboard.js';
import DashBoard from './DashBoard.js';
import InfoDisplay from './InfoDisplay.js';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options:{
        root: 0,
        scale: { name: null, values: null },
        showNoteLabel: false,
        showKeyLabel: true,
      }
    }
  }
  render(){
    const { options } = this.state;
    return (
      <div className="app">
        <div className="wrapper"> 
          <InfoDisplay 
            options={options}
          />
          <PianoKeyboard 
            options={options}
          />
          <DashBoard
            options={options}
            handleUpdate={(updatedOptions) => {
              this.setState({options: updatedOptions})
            }}
          />
        </div>
      </div>
    ); 
  }
}

export default App;
