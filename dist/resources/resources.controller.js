"use strict";
// resources.controller
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ResourcesController {
    /**
     * Gets specific file associated to end-user/server.
     *
     * @param path - path file associated to end-user/server
     * @returns file contents or null if file doesn't exists
     */
    static getSpecificFile(path) {
        if (fs_1.default.existsSync(path) && fs_1.default.lstatSync(path).isFile()) {
            return fs_1.default.readFileSync(path).toString();
        }
        return null;
    }
    /**
     * Gets list of files containing in folder associated to end-user/server.
     *
     * @param path - path of the folder
     * @returns list of files containing in folder or empty list if folder doesn't exists
     */
    static getFilesContaining(path) {
        if (fs_1.default.existsSync(path) && fs_1.default.lstatSync(path).isDirectory()) {
            return fs_1.default.readdirSync(path);
        }
        return [];
    }
}
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=resources.controller.js.map