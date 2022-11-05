import { Component } from 'react';
// import Syringe from '../assets/syringe.png';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }



    render() {
        return (
            <div className="navbar">
                {/* <img src={Syringe} /> */}
                <h1 className="heading">
                    Get Jabbed
                </h1>
                <ul className="navbar-nav">
                    <li className="navbar-item" onClick={() => { this.props.history.push('/') }}>
                        <div className="link">
                            Home
                        </div>
                    </li>
                    <li className="navbar-item" onClick={() => { this.props.history.push('/searchCenter') }}>
                        <div className="link" >
                            Slots
                        </div>
                    </li>
                    <li className="navbar-item" onClick={() => { this.props.history.push('login') }}>
                        <div className="link" >
                            Login
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(NavBar);