import { Errors } from '../config/errors.js';

interface ErrorImp {
  throw(string: 'a-version'): never;
}

export type TypeErrorsBase<T> = {
  [prop in string & keyof T]: ErrorImp;
};

export type TypeErrors = TypeErrorsBase<typeof Errors>;
