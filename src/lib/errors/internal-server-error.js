class InternalServerError {
  constructor(message = 'Internal server error') {
    this.error = 'internal_server_error';
    this.status = 500;
    this.message = message;
  }
}

export default InternalServerError;
