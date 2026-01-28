"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const glob_1 = require("glob");
const validator_1 = require("./validator");
async function run() {
    try {
        const filesPattern = core.getInput('files') || '**/*.{js,ts,md,json}';
        const checker = core.getInput('checker');
        const checkerOptions = JSON.parse(core.getInput('checker-options') || '{}');
        const decider = core.getInput('decider');
        const deciderOptions = JSON.parse(core.getInput('decider-options') || '{}');
        const filePaths = await (0, glob_1.glob)(filesPattern);
        const files = filePaths.map((filePath) => ({
            path: filePath,
            content: fs.readFileSync(path.resolve(filePath), 'utf8')
        }));
        const input = {
            files,
            checker,
            checkerOptions,
            decider,
            deciderOptions
        };
        const result = (0, validator_1.validateCodebaseStrings)(input);
        core.setOutput('results', JSON.stringify(result.results));
        core.setOutput('summary', JSON.stringify(result.summary));
        core.setOutput('pass', result.summary.pass.toString());
        if (result.summary.pass) {
            core.info(`✅ Validation passed: ${result.summary.reason}`);
        }
        else {
            core.setFailed(`❌ Validation failed: ${result.summary.reason}`);
        }
        if (result.results.length > 0) {
            core.info(`📊 Processed ${result.results.length} strings`);
            const validCount = result.results.filter(r => r.valid).length;
            core.info(`✅ ${validCount} valid, ❌ ${result.results.length - validCount} invalid`);
        }
    }
    catch (error) {
        core.setFailed(`Action failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
//# sourceMappingURL=action.js.map