import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/AuthActions';
import { clearErrors } from '../../actions/ErrorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        name:'',
        email:'',
        password:'',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error.msg !== prevProps.error.msg) {
            console.log(error)
            console.log(prevProps)
            console.log(1);
            // Check for the register fail
            if (error.id === "LOGIN_FAIL") {
                console.log(2);
                this.setState({ msg: error.msg.msg });
            }else {
                console.log(3);
                this.setState({ msg: null });
            };
        };

        // If authenticated close the modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = { email, password  };

        // Attempt to login
        this.props.login(user);

    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href='#' > Login </NavLink>
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                        User Login
                    </ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color='danger'>{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for='email'>Email</Label>
                                <Input 
                                    type='text' 
                                    name='email'
                                    id='email'
                                    placeholder= 'Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password</Label>
                                <Input 
                                    type='password' 
                                    name='password'
                                    id='password'
                                    placeholder= 'Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Button 
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    block
                                >login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);