"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerFactory = void 0;
const grammar_checker_1 = require("./grammar-checker");
const char_count_checker_1 = require("./char-count-checker");
const custom_checker_1 = require("./custom-checker");
class CheckerFactory {
    static createChecker(type) {
        switch (type) {
            case 'grammar':
                return new grammar_checker_1.GrammarChecker();
            case 'char_count':
                return new char_count_checker_1.CharCountChecker();
            case 'custom':
                return new custom_checker_1.CustomChecker();
            default:
                throw new Error(`Unknown checker type: ${type}`);
        }
    }
}
exports.CheckerFactory = CheckerFactory;
//# sourceMappingURL=checker-factory.js.map