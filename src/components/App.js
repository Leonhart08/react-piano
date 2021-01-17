import React from 'react';
import PianoKeyboard from './PianoKeyboard.js';
import Header from './Header.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: {
        currentDisplay: 'piano',
        root: 0,
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
            } 
          })
        }}
        />
        <div className="wrapper"> 
          <PianoKeyboard options={options} />
        </div>
      </div>
    ); 
  }
}

export default App;
