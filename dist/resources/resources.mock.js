"use strict";
// resources.mock
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
// Mock resources for files associated to end users and servers
exports.resources = {
    '5b829d9efb6fc0183b412bdf': {
        filesPath: config_1.default.resourcesPath('5b829d9efb6fc0183b412bdf'),
    },
    '5bd1af6cfb6fc017d2e6404a': {
        filesPath: config_1.default.resourcesPath('5bd1af6cfb6fc017d2e6404a'),
    },
    OAUTH_CONSUMER_CLIENT_ID: {
        filesPath: config_1.default.resourcesPath(''),
    },
};
//# sourceMappingURL=resources.mock.js.map