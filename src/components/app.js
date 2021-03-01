import React from 'react';

import Header from './header';
import PianoSection from './piano_section';
import BackToTopButton from './back_to_top_button';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentDisplay: 'piano',
      collapseDisplay: true
    }
  }

  render(){
    const { currentDisplay, collapseDisplay } = this.state;
    return (
      <div className="app">
        <Header 
          current={currentDisplay}
          onClick={(updatedState) => this.setState({ ...this.state, ...updatedState}) } 
        />
        <div className="wrapper"> 
          <PianoSection 
            display={currentDisplay}
            collapseDisplay={collapseDisplay}
          />
        </div>
        <BackToTopButton />
      </div>
    ); 
  }
}

export default App;
