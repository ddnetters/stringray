"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCodebaseStrings = validateCodebaseStrings;
const string_extractor_1 = require("./string-extractor");
const checkers_1 = require("./checkers");
const deciders_1 = require("./deciders");
function validateCodebaseStrings(input) {
    const extractor = new string_extractor_1.StringExtractor();
    const checker = checkers_1.CheckerFactory.createChecker(input.checker);
    const decider = deciders_1.DeciderFactory.createDecider(input.decider);
    const stringMatches = extractor.extractStrings(input.files);
    const results = stringMatches.map(match => {
        const checkResult = checker.check(match.content, input.checkerOptions);
        return {
            file: match.file,
            line: match.line,
            start: match.start,
            end: match.end,
            content: match.content,
            valid: checkResult.valid,
            message: checkResult.message
        };
    });
    const summary = decider.decide(results, input.deciderOptions);
    return {
        results,
        summary
    };
}
//# sourceMappingURL=validator.js.map