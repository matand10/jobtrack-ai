"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const health_routes_1 = require("./routes/health.routes");
const not_found_middleware_1 = require("./middleware/not-found.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_route_1 = require("./routes/auth.route");
const application_routes_1 = require("./routes/application.routes");
const auth_middleware_1 = require("./middleware/auth.middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(health_routes_1.healthRouter);
exports.app.use("/api/auth", auth_route_1.authRouter);
exports.app.use("/api/applications", auth_middleware_1.authMiddleware, application_routes_1.applicationRouter);
exports.app.use(not_found_middleware_1.notFoundMiddleware);
exports.app.use(error_middleware_1.errorMiddleware);
