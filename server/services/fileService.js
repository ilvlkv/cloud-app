const fs = require('fs');
const File = require('../models/File');
const { filePath } = require('../config');

class FileService {
  createDir(File) {
    const path = `${filePath}\\${File.user}\\${File.path}`;

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
          return resolve({ message: 'File was created' });
        } else {
          return reject({ message: 'File already exists' });
        }
      } catch (error) {
        return reject({ message: 'File error' });
      }
    });
  }
}

module.exports = new FileService();
