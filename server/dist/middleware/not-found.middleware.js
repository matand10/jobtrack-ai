"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
function notFoundMiddleware(req, res) {
    res.status(404).json({
        code: "ROUTE_NOT_FOUND",
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
}
