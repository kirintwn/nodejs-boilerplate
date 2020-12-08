/* eslint-disable max-classes-per-file */

export const ErrorType = {
  SystemError: 'SystemError',
  DataSourceFailedError: 'DataSourceFailedError',
  NotImplementedError: 'NotImplementedError',
};

export class SystemError extends Error {
  constructor(scope, message) {
    super(`[${scope}] ${message}`);
    this.type = ErrorType.SystemError;
  }
}
