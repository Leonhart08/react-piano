import React from 'react';
import { FaKeyboard } from 'react-icons/fa';
import Keyboard from './../icons/play'

class MainDashboard extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div className="main-dashboard">
        <div className="main-dashboard-title">
          <FaKeyboard color="white" size="3rem" />
          <span> Use your <strong> Keyboard </strong> to play the piano notes!</span>
        </div>

        <div className="main-dashboard-content">
          <div className="main-dashboard-content-title">
            <span> > React Piano Keyboard _ </span>
          </div>

          <div className="main-dashboard-content-description">
            <span> 
              <strong>React Piano Keyboard</strong> is a mini-project using the ReactJs framework and the library ToneJs.  You can use your keyboard or the mouse to interact with it. Also you can display <strong>chords</strong> and <strong>scales</strong> progressions 
            </span>
          </div>

          <div className="main-dashboard-content-references">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <img src="https://avatars.githubusercontent.com/u/11019186?s=280&v=4" />
          </div>
        </div>
      </div>
    ); 
  }
}

export default MainDashboard;
