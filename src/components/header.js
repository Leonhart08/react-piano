import React from 'react';

class Header extends React.Component {
  render(){
    const{ current} = this.props;

    return (
      <div className="header-container">
        <div className="navigator">
          <div className={`navigator-item ${current === 'piano' ? 'active' : ''}`}>
            Piano
          </div>
        </div>
      </div>
    ); 
  }
}

export default Header;
