"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoCriticalDecider = void 0;
class NoCriticalDecider {
    decide(results, options) {
        const criticalIssues = results.filter(r => r.message.includes('CRITICAL'));
        if (criticalIssues.length === 0) {
            return {
                pass: true,
                reason: 'No critical issues found'
            };
        }
        return {
            pass: false,
            reason: `Found ${criticalIssues.length} critical issue(s)`
        };
    }
}
exports.NoCriticalDecider = NoCriticalDecider;
//# sourceMappingURL=no-critical-decider.js.map