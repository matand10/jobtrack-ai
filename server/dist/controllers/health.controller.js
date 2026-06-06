"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
class HealthController {
    getHealth(req, res) {
        res.status(200).json({ status: "ok" });
    }
}
exports.healthController = new HealthController();
