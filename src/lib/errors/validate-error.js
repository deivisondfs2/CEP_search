class ValidateError {
  constructor(schemaErrors, error = 'validation_error', message = 'CEP is invalid') {
    this.error = error;
    this.message = message;
    this.status = 400;
    if (schemaErrors) this.schemaErrors = schemaErrors;
  }
}

export default ValidateError;
