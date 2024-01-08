import fs from 'fs';
import path from 'path';
import mparse from '@cabloy/module-parse';

export default {
  lookupPackage(dir) {
    let _dir = dir;
    // eslint-disable-next-line
    while (true) {
      const file = path.join(_dir, 'package.json');
      if (file === '/package.json') return null;
      if (fs.existsSync(file)) return file;
      _dir = path.join(_dir, '../');
    }
  },
  parseInfoFromPackage(dir) {
    const file = this.lookupPackage(dir);
    if (!file) return null;
    const pkg = require(file);
    return mparse.parseInfo(mparse.parseName(pkg.name));
  },
};
