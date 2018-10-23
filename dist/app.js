"use strict";
// app
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
// Load environments variables
dotenv_1.default.load();
var app = express_1.default();
app.set('port', process.env.PORT);
// Used for disable https certificates validations
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Middlewares configurations
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default(process.env.NODE_ENV || 'dev'));
// Routes
exports.default = app;
//# sourceMappingURL=app.js.map