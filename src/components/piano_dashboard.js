import React from 'react';
import { Collapse } from 'react-collapse';
import MainDashboard from './dashboard/main_dashboard'
import ChordDashboard from './dashboard/chord_dashboard'
import ScalesDashboard from './dashboard/scales_dashboard'

const PianoDashboard = props => {
  const { display, collapse, ...otherProps } = props

  return (
    <div className="piano-dashboard">
      <Collapse isOpened={!collapse}>
        { (display === 'chords' || display === 'piano') && <ChordDashboard { ...otherProps } /> }
        { (display === 'scales' || display === 'piano')  && <ScalesDashboard { ...otherProps } /> }
      </Collapse>
      <MainDashboard display={display} { ...otherProps } />
    </div>
  )
}

export default PianoDashboard;
