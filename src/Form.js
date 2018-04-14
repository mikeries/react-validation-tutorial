import React, { Component } from 'react';
import './Form.css';
import FormValidator from './FormValidator';
import validations from './validations'

class Form extends Component {
  constructor() {
    super();

    this.validator = new FormValidator(validations.login_rules);

    this.state = {
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      validation: this.validator.valid(),
    }

    this.submitted = false;
  }

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
    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state

    return (
      <form className="demoForm">
        <h2>Sign up</h2>

        <div className={validation.email.isInvalid && 'has-error'}>
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control"
            name="email"
            placeholder="john@doe.com"
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