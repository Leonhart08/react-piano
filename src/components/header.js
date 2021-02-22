import React from 'react';

class Header extends React.Component {
  render(){
    const{ current, onClick } = this.props;

    return (
      <div className="header-container">
        <div className="navigator">
          <div className={`navigator-item ${current === 'piano' ? 'active' : ''}`} onClick={()=> {onClick('piano')}}>
            Piano
          </div>
          <div className={`navigator-item ${current === 'chords' ? 'active' : ''}`} onClick={()=>{onClick('chords')}}>
            Chords
          </div>
          <div className={`navigator-item ${current === 'scales' ? 'active' : ''}`} onClick={()=>{onClick('scales')}}>
            Scales
          </div>
        </div>
      </div>
    ); 
  }
}

export default Header;
