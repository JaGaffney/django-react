import React, { Component } from 'react'

import Lottie from 'react-lottie';

// doesnt work as intended should be for each item but is rendering as 1 single item
export class Animation extends Component {

  render() {

    // default properties of the animation
    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: this.props.animationItemData,
      rendererSettings: {
        preserveAspectRatio: 'none'
      }
    }

    return (
      <Lottie options={defaultOptions}
        isStopped={this.props.stopped}
        id={this.props.name}
      />
    )
  }
}

// sets the default value of stopped to true so animations dont auto start
Animation.defaultProps = { stopped: true }

export default Animation
