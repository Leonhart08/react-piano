import React from 'react';

import { FaArrowUp } from 'react-icons/fa';

class BackToTopButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: true,
    }

    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll(){
    return this.setState({ visible: window.pageYOffset >= 100 })
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  render(){
    const { visible } = this.state

    return visible && (
      <div className='back-to-top-section' onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth' })}>
        <FaArrowUp size="3rem" color="white" />
      </div>
    ); 
  }
}

export default BackToTopButton;
