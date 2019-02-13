import React, { Component } from 'react'

import Lottie from 'react-lottie';
import animationData from './bin.json'

// doesnt work as intended should be for each item but is rendering as 1 single item
export class Animation extends Component {
  render() {

    const defaultOptions = {
        loop: this.props.isLoop,
        autoplay: this.props.isStopped,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'none'
        }
    }

    return (
        <Lottie options={defaultOptions}
        />
    )
  }
}

export default Animation
