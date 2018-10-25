"use strict";
// server
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
const fs_1 = require("fs");
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
// HTTPS options configuration
const options = {
    key: fs_1.readFileSync(config_1.default.privateKeyPath),
    cert: fs_1.readFileSync(config_1.default.certificatePath),
};
https.createServer(options, app_1.default).listen(app_1.default.get('port'), () => {
    console.log(`Resource Server is running at https://localhost:${app_1.default.get('port')}
               in ${app_1.default.get('env')} mode`);
});
//# sourceMappingURL=server.js.map