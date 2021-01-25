
import React from 'react';
import ReactSlider from 'react-slider';
import ReactTooltip from 'react-tooltip';

class SettingsSlider extends React.Component {
  
    render () {
      const { name, values, onChange } = this.props

      return (
        <div className='slide-section'>
          <ReactSlider
            className="vertical-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            orientation="vertical"
            defaultValue={values.current}
            min={values.min}
            max={values.max}
            step={0.1}
            onAfterChange={val => onChange(val)}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            invert
          />
          <div className='slide-name-label'>
            <p data-tip={name}> {name[0].toUpperCase()} </p>
            <ReactTooltip place="top" type="light" effect="solid"/>
          </div>
        </div>
      )
    }
}

export default SettingsSlider;
