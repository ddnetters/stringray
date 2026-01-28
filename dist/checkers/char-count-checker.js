"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharCountChecker = void 0;
class CharCountChecker {
    check(content, options) {
        const maxChars = options?.maxChars ?? 100;
        if (content.length > maxChars) {
            return {
                valid: false,
                message: `Too long (${content.length} > ${maxChars})`
            };
        }
        return { valid: true, message: 'OK' };
    }
}
exports.CharCountChecker = CharCountChecker;
//# sourceMappingURL=char-count-checker.js.map