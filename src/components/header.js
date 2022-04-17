import React from 'react';

const Header = props => {
  const { current, onClick } = props

  return (
    <div className="header-container">
      <div className="navigator">
        <div className={`navigator-item ${current === 'piano' ? 'active' : ''}`} onClick={()=> { onClick({ currentDisplay: 'piano', collapseDisplay: true })}}>
          Piano
        </div>
        <div className={`navigator-item ${current === 'chords' ? 'active' : ''}`} onClick={()=>{ onClick({ currentDisplay: 'chords', collapseDisplay: false })}}>
          Chords
        </div>
        <div className={`navigator-item ${current === 'scales' ? 'active' : ''}`} onClick={()=>{ onClick({ currentDisplay: 'scales', collapseDisplay: false })}}>
          Scales
        </div>
      </div>
    </div>
  ); 
}

export default Header;
