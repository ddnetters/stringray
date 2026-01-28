"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomChecker = exports.CharCountChecker = exports.GrammarChecker = exports.CheckerFactory = void 0;
var checker_factory_1 = require("./checkers/checker-factory");
Object.defineProperty(exports, "CheckerFactory", { enumerable: true, get: function () { return checker_factory_1.CheckerFactory; } });
var grammar_checker_1 = require("./checkers/grammar-checker");
Object.defineProperty(exports, "GrammarChecker", { enumerable: true, get: function () { return grammar_checker_1.GrammarChecker; } });
var char_count_checker_1 = require("./checkers/char-count-checker");
Object.defineProperty(exports, "CharCountChecker", { enumerable: true, get: function () { return char_count_checker_1.CharCountChecker; } });
var custom_checker_1 = require("./checkers/custom-checker");
Object.defineProperty(exports, "CustomChecker", { enumerable: true, get: function () { return custom_checker_1.CustomChecker; } });
//# sourceMappingURL=checkers.js.map