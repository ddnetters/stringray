import { CheckResult } from '../types';

export const IS_ASYNC_CHECKER = Symbol('isAsyncChecker');

export interface Checker {
  check(content: string, options?: Record<string, any>): CheckResult;
}

export interface AsyncChecker {
  [IS_ASYNC_CHECKER]: true;
  check(content: string, options?: Record<string, any>): Promise<CheckResult>;
}

export function isAsyncChecker(checker: Checker | AsyncChecker): checker is AsyncChecker {
  return IS_ASYNC_CHECKER in checker && checker[IS_ASYNC_CHECKER] === true;
}
