import React, { Component } from 'react';
import './Form.css';
import FormValidator from './FormValidator';

class Form extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      { field: 'email', method: 'isEmpty', validWhen: false, message: 'Email is required.'},
      { field: 'email', method: 'isEmail', validWhen: true,  message: 'That is not a valid email.' },
      { field: 'phone', method: 'isEmpty', validWhen: false, message: 'Phone is required.' },
      { field: 'phone', method: 'matches', args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
                        validWhen: true, message: 'That is not a valid phone number.'},
      { field: 'password', method: 'isEmpty', validWhen: false, message: 'Password is required.' },
      { field: 'password_confirmation', method: 'isEmpty', validWhen: false, message: 'Password confirmation is required.' },
      { field: 'password_confirmation', method: this.passwordMatch, validWhen: true, message: 'Password and password confirmation do not match.'}
    ]);

    this.state = {
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      validation: this.validator.reset(),
    }

    this.submitted = false;
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  }
    
  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
    }
  }

  render() {
    let validation = this.submitted ? 
                      this.validator.validate(this.state) :
                      this.state.validation

    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className={validation.email.isInvalid && 'has-error'}>
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control"
            name="email"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.email.message}</span>
        </div>
        <div className={validation.phone.isInvalid && 'has-error'}>
          <label htmlFor="phone">Phone</label>
          <input type="phone" className="form-control"
            name="phone"
            placeholder="(xxx)xxx-xxxx"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.phone.message}</span>
        </div>
        <div className={validation.password.isInvalid && 'has-error'}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control"
            name="password"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.password.message}</span>
        </div>
        <div className={validation.password_confirmation.isInvalid && 'has-error'}>
          <label htmlFor="password_confirmation">Password Again</label>
          <input type="password" className="form-control"
            name="password_confirmation"
            onChange={this.handleInputChange}
          />
        <span className="help-block">{validation.password_confirmation.message}</span>
        </div>
        <button onClick={this.handleFormSubmit} className="btn btn-primary">
          Sign up
       </button>
      </form>
    )
  }
}
export default Form;