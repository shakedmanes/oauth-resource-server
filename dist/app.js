"use strict";
// app
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_handler_1 = require("./error/error.handler");
const resources_routes_1 = __importDefault(require("./resources/resources.routes"));
// Load environments variables
dotenv_1.default.load();
const app = express_1.default();
app.set('port', process.env.PORT);
// Used for disable https certificates validations
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Middlewares configurations
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default(process.env.NODE_ENV || 'dev'));
// Routes
app.use('/resources/', resources_routes_1.default);
// Error handler
app.use(error_handler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map