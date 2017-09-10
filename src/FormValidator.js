import validator from 'validator';

class FormValidator {
  constructor(validations) {
    // validations is an array of validation rules specific to a form
    this.validations = validations;
  }

  validate(state) {
    // start out assuming valid
    let validation = this.valid();

    // for each validation rule
    this.validations.forEach(rule => {

      // if the field hasn't already been marked invalid by an earlier rule
      if (!validation[rule.field].isInvalid) {
        // determine the field value, the method to invoke and optional args from 
        // the rule definition
        const field_value = state[rule.field].toString();
        const args = rule.args || [];
        const validation_method = 
              typeof rule.method === 'string' ?
              validator[rule.method] : 
              rule.method
              
        // call the validation_method with the current field value as the first
        // argument, any additional arguments, and the whole state as a final
        // argument.  If the result doesn't match the rule.validWhen property,
        // then modify the validation object for the field and set the isValid
        // field to false
        if(validation_method(field_value, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message }
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  valid() {
    const validation = {}

    this.validations.map(rule => (
      validation[rule.field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation };
  }
}

export default FormValidator;