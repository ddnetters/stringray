"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDecider = void 0;
class CustomDecider {
    decide(results, options) {
        const logic = options?.logic;
        if (!logic || typeof logic !== 'string') {
            return { pass: false, reason: 'No custom logic provided' };
        }
        try {
            const deciderFunction = new Function('results', `return ${logic}`);
            const result = deciderFunction(results);
            if (typeof result === 'boolean') {
                return { pass: result, reason: result ? 'Custom check passed' : 'Custom check failed' };
            }
            if (typeof result === 'object' && result !== null) {
                return {
                    pass: result.pass ?? false,
                    reason: result.reason ?? 'Custom decision completed'
                };
            }
            return { pass: false, reason: 'Invalid custom logic result' };
        }
        catch (error) {
            return { pass: false, reason: `Custom logic error: ${error}` };
        }
    }
}
exports.CustomDecider = CustomDecider;
//# sourceMappingURL=custom-decider.js.map