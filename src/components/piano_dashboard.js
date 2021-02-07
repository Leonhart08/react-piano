import React from 'react';
import ChordDashboard from './dashboard/chord_dashboard'

class PianoDashboard extends React.Component {

  render(){
    const { display, ...otherProps } = this.props

    return (
      <div className="piano-dashboard">
        {display === 'chords' && <ChordDashboard { ...otherProps } />}
      </div>
    ); 
  }
}

export default PianoDashboard;
