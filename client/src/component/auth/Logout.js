import React, {Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/AuthActions';



class Logout extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    render(){
        return ( 
            <Fragment>
                <NavLink onClick={ this.props.logout } href='#'>Logout</NavLink>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout);