import React from 'react';
import PianoSection from './piano_section';
import Header from './header';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentDisplay: 'piano',
    }
  }

  render(){
    const { currentDisplay } = this.state;

    return (
      <div className="app">
        <Header current={currentDisplay} />
        <div className="wrapper"> 
          <PianoSection />
        </div>
      </div>
    ); 
  }
}

export default App;
