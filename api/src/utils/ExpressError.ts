import ErrorMessage from './ErrorMessage';
import HttpStatusCode from './HttpStatusCode';

export default class ExpressError extends Error {
  code = HttpStatusCode.INTERNAL_SERVER_ERROR;

  constructor(message = ErrorMessage.SERVER_ERROR) {
    super(message);
    this.name = 'ExpressError';
  }
}
