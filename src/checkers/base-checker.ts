import { CheckResult } from '../types';

export interface Checker {
  check(content: string, options?: Record<string, any>): CheckResult;
}

export interface AsyncChecker {
  check(content: string, options?: Record<string, any>): Promise<CheckResult>;
}

export function isAsyncChecker(checker: Checker | AsyncChecker): checker is AsyncChecker {
  return checker.check.constructor.name === 'AsyncFunction';
}
