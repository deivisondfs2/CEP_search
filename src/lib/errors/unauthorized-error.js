class UnauthorizedError {
  constructor(message = 'Invalid token') {
    this.error = 'invalid_token';
    this.status = 401;
    this.message = message;
  }
}

export default UnauthorizedError;
