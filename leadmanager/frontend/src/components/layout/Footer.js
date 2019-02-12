import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <div className="test">
        <footer className="page-footer font-small blue pt-4">
            <div className="footer-copyright text-center py-3">© 2019 Copyright:<span>&nbsp; &nbsp;</span>  
                <a href="https://jongaffney.tech">jongaffney.tech</a>
            </div>
        </footer>
      </div>
    )
  }
}

export default Footer
