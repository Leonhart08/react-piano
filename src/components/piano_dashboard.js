import React from 'react';
import MainDashboard from './dashboard/piano_dashboard'
import ChordDashboard from './dashboard/chord_dashboard'
import ScalesDashboard from './dashboard/scales_dashboard'

class PianoDashboard extends React.Component {

  render(){
    const { display, ...otherProps } = this.props

    return (
      <div className="piano-dashboard">
        {display === 'piano' && <MainDashboard { ...otherProps } />}
        {display === 'chords' && <ChordDashboard { ...otherProps } />}
        {display === 'scales' && <ScalesDashboard { ...otherProps } />}
      </div>
    ); 
  }
}

export default PianoDashboard;
