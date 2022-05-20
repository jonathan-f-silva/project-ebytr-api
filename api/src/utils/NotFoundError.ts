import ErrorMessage from './ErrorMessage';
import ExpressError from './ExpressError';
import HttpStatusCode from './HttpStatusCode';

export default class NotFoundError extends ExpressError {
  code = HttpStatusCode.NOT_FOUND;

  constructor(message = ErrorMessage.OBJECT_NOT_FOUND) {
    super(message);
    this.name = 'NotFoundError';
  }
}
