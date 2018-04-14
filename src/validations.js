// import the validator library to do most of the heavy lifting
import validator from 'validator'

// add custom function definitions here to use in the exported rule sets
// if you had many of these, you might put them in their own file
const passwordMatch = (confirmation, state) => (state.password === confirmation)

// export an object containing the validation rules
export default {

  // define validation rules specific to each of your forms.
  login_rules: [
    { 
      field: 'email', 
      method: validator.isEmpty, 
      validWhen: false, 
      message: 'Email is required.' 
    },
    { 
      field: 'email',
      method: validator.isEmail, 
      validWhen: true, 
      message: 'That is not a valid email.'
    },
    { 
      field: 'phone', 
      method: validator.isEmpty, 
      validWhen: false, 
      message: 'Please provide a phone number.'
    },
    {
      field: 'phone', 
      method: validator.matches,
      args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
      validWhen: true, 
      message: 'That is not a valid phone number.'
    },
    { 
      field: 'password', 
      method: validator.isEmpty, 
      validWhen: false, 
      message: 'Password is required.'
    },
    { 
      field: 'password_confirmation', 
      method: validator.isEmpty, 
      validWhen: false, 
      message: 'Password confirmation is required.'
    },
    { 
      field: 'password_confirmation', 
      method: passwordMatch,   // notice that we are passing a custom function here
      validWhen: true, 
      message: 'Password and password confirmation do not match.'
    }
  ]
}