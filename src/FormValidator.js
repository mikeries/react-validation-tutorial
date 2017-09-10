import validator from 'validator';

class FormValidator {
  constructor(validations) {

    // validations is an array of validation rules specific to a form
    this.validations = validations;
  }

  validate(state) {
    let validation = this.valid();
    this.validations.forEach(v => {
      if (!validation[v.field].isInvalid) {
        const args = v.args || [];
        const validation_method = 
              typeof v.method === 'string' ?
              validator[v.method] : 
              v.method
              
        if(validation_method(state[v.field].toString(), ...args, state) !== v.validWhen) {
          validation[v.field] = { isInvalid: true, message: v.message }
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  valid() {
    const validation = {}

    this.validations.map(v => (
      validation[v.field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation };
  }
}

export default FormValidator;