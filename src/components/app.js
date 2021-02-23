import React from 'react';
import PianoSection from './piano_section';
import Header from './header';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentDisplay: 'chords',
    }
  }

  render(){
    const { currentDisplay } = this.state;

    return (
      <div className="app">
        <Header 
          current={currentDisplay}
          onClick={(display) => this.setState({ currentDisplay: display }) } 
          />
        <div className="wrapper"> 
          <PianoSection 
            display={currentDisplay}
          />
        </div>
      </div>
    ); 
  }
}

export default App;
