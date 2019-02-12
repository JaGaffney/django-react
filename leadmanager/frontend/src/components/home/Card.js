import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Card extends Component {

    render() {
        return (

            <Link to={ this.props.titleName.toLowerCase() }>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="card text-white bg-primary mb-3" style={{ maxWidth: '40rem', minWidth: '20rem',  marginTop: '2rem' }}>
                            <div className="card-header">{this.props.titleName}</div>

                            <div className="card-body">
                                <p className="card-text">{this.props.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Card
