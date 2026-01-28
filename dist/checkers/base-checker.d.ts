import { CheckResult } from '../types';
export interface Checker {
    check(content: string, options?: Record<string, any>): CheckResult;
}
//# sourceMappingURL=base-checker.d.ts.map