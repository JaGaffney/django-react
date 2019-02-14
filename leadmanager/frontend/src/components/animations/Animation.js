import React, { Component } from 'react'

import Lottie from 'react-lottie';

// doesnt work as intended should be for each item but is rendering as 1 single item
export class Animation extends Component {

  render() {
    console.log(this.props)

    const defaultOptions = {
      loop: false,
      autoplay: this.props.stopped,
      animationData: this.props.animationItemData,
      rendererSettings: {
        preserveAspectRatio: 'none'
      }
    }

    return (
        <Lottie options={defaultOptions}
          isStopped={this.props.stopped}
        />
    )
  }
}

export default Animation
