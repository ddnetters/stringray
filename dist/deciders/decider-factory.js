"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeciderFactory = void 0;
const threshold_decider_1 = require("./threshold-decider");
const no_critical_decider_1 = require("./no-critical-decider");
const custom_decider_1 = require("./custom-decider");
class DeciderFactory {
    static createDecider(type) {
        switch (type) {
            case 'threshold':
                return new threshold_decider_1.ThresholdDecider();
            case 'noCritical':
                return new no_critical_decider_1.NoCriticalDecider();
            case 'custom':
                return new custom_decider_1.CustomDecider();
            default:
                throw new Error(`Unknown decider type: ${type}`);
        }
    }
}
exports.DeciderFactory = DeciderFactory;
//# sourceMappingURL=decider-factory.js.map