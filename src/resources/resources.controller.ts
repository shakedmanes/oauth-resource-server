// resources.controller

import fs from 'fs';

export class ResourcesController {

  /**
   * Gets specific file associated to end-user/server.
   *
   * @param path - path file associated to end-user/server
   * @returns file contents or null if file doesn't exists
   */
  static getSpecificFile(path: string) {
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
      return fs.readFileSync(path).toString();
    }

    return null;
  }

  /**
   * Gets list of files containing in folder associated to end-user/server.
   *
   * @param path - path of the folder
   * @returns list of files containing in folder or empty list if folder doesn't exists
   */
  static getFilesContaining(path: string) {
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      return fs.readdirSync(path);
    }

    return [];
  }
}
