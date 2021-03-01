import React from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { init } from 'ityped'

class MainDashboard extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const myElement = document.querySelector('#contentTitle')
    init(myElement, { cursorChar: "_", loop: false, showCursor: true, strings: [' > React Piano Keyboard '] })
  }

  render(){
    const { display } = this.props 

    return (
      <div className="main-dashboard">
        <div className={`main-dashboard-title${display !== 'piano' ? ' main-dashboard-title--hide' : ''}`}>
          <FaKeyboard color="white" size="3rem" />
          <span> Use your <strong> Keyboard </strong> to play the piano notes! </span>
        </div>

        <div className="main-dashboard-content">
          <div className="main-dashboard-content-title">
            <span id="contentTitle"></span>
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
