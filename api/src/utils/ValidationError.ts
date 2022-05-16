import ErrorMessage from './ErrorMessage';
import ExpressError from './ExpressError';
import HttpStatusCode from './HttpStatusCode';

export default class ValidationError extends ExpressError {
  code = HttpStatusCode.BAD_REQUEST;

  constructor(message = ErrorMessage.VALIDATION_ERROR) {
    super(message);
    this.name = 'ValidationError';
  }
}
