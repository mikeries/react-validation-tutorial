import React, { Component } from 'react';
import './Form.css';
import FormValidator from './FormValidator';

class Form extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      { field: 'duration', method: 'isNumeric', validWhen: true, message: 'Duration must be a number.'},
      { field: 'duration', method: 'isInt', args: [{min: 1, max: 100}], 
                          validWhen: true, message: 'Duration must be between 1 and 100 minutes.'},

      { field: 'ballast', method: 'isNumeric', validWhen: true, message: 'Ballast must be a number.'},
      { field: 'ballast', method: 'isInt', args: [{min: 0, max: 20}], 
                          validWhen: true, message: 'Ballast must between 0 and 20 pounds.'},

      { field: 'max_depth', method: 'isNumeric', validWhen: true, message: 'Maximum depth must be a number.'},
      { field: 'max_depth', method: 'isInt', args: [{min: 1, max: 150}], 
                          validWhen: true, message: 'Maximum depth must be between 1 and 150 feet.'},

      { field: 'starting_pressure', method: 'isNumeric', validWhen: true, message: 'Starting pressure must be a number, in psi.'},
      { field: 'starting_pressure', method: 'isInt', args: [{min: 1, max: 4000}], 
                          validWhen: true, message: 'Starting pressure must be between 1 and 4000 psi.'},

      { field: 'final_pressure', method: 'isNumeric', validWhen: true, message: 'Final pressure must be a number, in psi.'},
      { field: 'final_pressure', method: 'isInt', args: [{min: 1, max: 4000}], 
                          validWhen: true, message: 'Final pressure must be between 1 and 4000 psi.'},

      { field: 'time', method: 'matches', args: [/^\d?\d:\d\d$/],
                      validWhen: true, message: 'Time must be in the format hh:mm.'},
    ]);
  }
  componentWillMount() {
    this.state = {
      validation: this.validator.reset()
    };
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

    if (validation.isValid) {
      this.setState({ submitted: true });

      this.props.onSubmit({
        ...this.state
      });
    }
  }

  render() {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control"
            name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="phone" className="form-control"
            name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control"
            name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Password Again</label>
          <input type="password" className="form-control"
            name="password_confirmation" />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
       </button>
      </form>
    )
  }
}
export default Form;