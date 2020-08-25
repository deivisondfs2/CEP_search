class NotFoundError {
  constructor(message = 'Not found') {
    this.error = 'not_found';
    this.status = 404;
    this.message = message;
  }
}

export default NotFoundError;
