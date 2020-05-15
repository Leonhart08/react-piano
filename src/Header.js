import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const{ current, handleClick } = this.props;
    return (
      <div className="header-container">
        <div className="navigator">
          <div 
            onClick={()=>{ handleClick('scales')}}
            className={`navigator-item ${current === 'scales' ? 'active' : ''}`}
          > 
            Scales 
          </div>
          <div 
            onClick={()=>{ handleClick('chords')}}
            className={`navigator-item ${current === 'chords' ? 'active' : ''}`}
          > 
            Chords 
          </div>
        </div>
      </div>
    ); 
  }
}

export default Header;
