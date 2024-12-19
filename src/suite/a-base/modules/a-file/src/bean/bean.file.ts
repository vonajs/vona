import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

import path from 'path';
import fs from 'fs';

import sendToWormhole from 'stream-wormhole';
import Jimp from 'jimp';
import bb from 'bluebird';
import pump from 'pump';
import fse from 'fs-extra';
import base64url from 'base64url';
import Mime from 'mime';

const REGEXP_DATA_URL = /^data:([^;]+);[^,]*base64,(.*)/;

@Bean()
export class BeanFile extends BeanBase {
  get modelFile() {
    return this.scope.model.file;
  }
  get modelFileView() {
    return this.scope.model.fileView;
  }

  async all({ atomClass, options, user }: any) {
    // file
    options.file = 1;
    // select
    const items = await this.app.bean.atom.select({
      atomClass,
      options,
      user,
    });
    // downloadUrl
    for (const item of items) {
      item.i_downloadUrl = this.getDownloadUrl({
        downloadId: item.i_downloadId,
        atomId: item.atomId,
        mode: item.i_mode,
        fileExt: item.i_fileExt,
      });
    }
    // ok
    return items;
  }

  // key,user maybe null
  async list({ key, options, user }: any) {
    // page
    options.page = this.app.bean.util.page(options.page, false);
    // where
    options.where = options.where || {};
    // check right: atom.read or user's files
    const atomId = key && key.atomId;
    if (atomId) {
      if (user && user.id) {
        const res = await this.app.bean.atom.checkRightRead({
          atom: { id: atomId },
          user,
          checkFlow: true,
        });
        if (!res) this.app.throw(403);
      }
      options.where.atomId = atomId; // add where
    } else {
      if (user && user.id) {
        options.where.userId = user.id; // add where
      }
    }
    // _options
    const _options: any = {};
    // where
    _options.where = options.where || {};
    // orders
    _options.orders = options.orders;
    // page
    if (options.page.size !== 0) {
      _options.limit = options.page.size;
      _options.offset = options.page.index;
    }
    // select
    const items = await this.modelFileView.select(_options);
    for (const item of items) {
      item.downloadUrl = this.getDownloadUrl(item);
    }
    return items;
  }

  async attachments({ key, options, user }: any) {
    options = options || {};
    // filter drafts
    options.where = this.app.bean.util.extend(options.where, {
      mode: 2,
      attachment: 1,
    });
    if (!options.orders) {
      options.orders = [['realName', 'asc']];
    }
    // list
    return await this.list({ key, options, user });
  }

  async delete({ downloadId, fileId, user }: any) {
    // file
    const file = await this.getFile({ downloadId, fileId });
    if (!file) this.app.throw(404);
    // check right
    if (user && user.id) {
      await this.fileUpdateCheck({ file, user });
    }
    // delete
    await this.modelFile.delete({ id: file.id });
    // attachmentCount
    if (file.atomId && file.attachment) {
      await this.app.bean.atom.attachment({ key: { atomId: file.atomId }, atom: { attachment: -1 } });
    }
  }

  async update({ fileId, data, user }: any) {
    // check
    if (user && user.id) {
      // file
      const file = await this.modelFile.get({ id: fileId });
      // check right
      await this.fileUpdateCheck({ file, user });
    }
    // update
    await this.modelFile.update({
      id: fileId,
      ...data,
    });
  }

  async upload({ user }: any) {
    const stream = await this.ctx.getFileStream();
    try {
      const meta = {
        filename: stream.filename,
        encoding: stream.encoding,
        mime: stream.mime,
        fields: stream.fields,
      };
      return await this._upload({ fileContent: stream, meta, user });
    } catch (e) {
      await sendToWormhole(stream);
      throw e;
    }
  }

  async uploadDataUrl({ data, user }: any) {
    const dataUrl = data.dataUrl || '';
    const matches = dataUrl.match(REGEXP_DATA_URL);
    if (!matches) return null;
    // info
    const mime = matches[1];
    const contentBase64 = matches[2];
    let ext = mime.split('/')[1];
    if (ext.indexOf('svg') > -1) {
      ext = 'svg';
    }
    const filename = `${data.title || '_none_'}.${ext}`;
    const encoding = data.encoding || '7bit';
    // content
    const fileContent = base64url.default.toBuffer(contentBase64);
    // console.log('----fileContent: ', typeof fileContent);
    // meta
    const meta = {
      filename,
      encoding,
      mime,
      fields: {
        mode: data.mode,
        atomId: data.atomId,
        attachment: data.attachment,
        flag: data.flag,
      },
    };
    return await this._upload({ fileContent, meta, user });
  }

  async uploadByLocalFile({ pathFile, meta, user }: any) {
    if (!meta) meta = {};
    if (!meta.fields) meta.fields = {};
    // mode
    if (!meta.fields.mode) {
      meta.fields.mode = 2; // file
    }
    // filename
    if (!meta.filename) {
      meta.filename = path.basename(pathFile);
    }
    // encoding
    if (!meta.encoding) {
      meta.encoding = '7bit';
    }
    // mime
    if (!meta.mime) {
      meta.mime = Mime.getType(pathFile);
    }
    // content
    const fileContent = await fse.readFile(pathFile);
    // upload
    return await this._upload({
      fileContent,
      meta,
      user,
    });
  }

  async _upload({ fileContent, meta, user }: any) {
    // info
    const fileInfo = path.parse(meta.filename);
    if (fileInfo.name === '_none_') {
      fileInfo.name = '';
    }
    if (fileInfo.ext) fileInfo.ext = fileInfo.ext.toLowerCase();
    const encoding = meta.encoding;
    const mime = meta.mime;
    const fields = meta.fields;
    const mode = parseInt(fields.mode || 2);
    const atomId = parseInt(fields.atomId || 0);
    const attachment = parseInt(fields.attachment || 0);
    const flag = fields.flag || '';
    let imgWidth = 0;
    let imgHeight = 0;

    // jpeg->jpg
    if (fileInfo.ext === '.jpeg') fileInfo.ext = '.jpg';

    // dest
    const downloadId = this.app.bean.util.uuidv4();
    const _filePath = `file/${mode === 1 ? 'image' : mode === 2 ? 'file' : 'audio'}/${this.app.bean.util.today()}`;
    const _fileName = this.app.bean.util.uuidv4();
    const destDir = await this.app.bean.base.getPath(_filePath, true);
    const destFile = path.join(destDir, `${_fileName}${fileInfo.ext}`);

    // write
    if (mode === 1) {
      if (!this._isSupportedImageTypes(fileInfo.ext)) {
        await this._outputFileContent({ destFile, fileContent });
      } else {
        const size = await this._outputImageContent({ destFile, fileContent, fields, fileInfo });
        imgWidth = size.width;
        imgHeight = size.height;
      }
    } else if (mode === 2 || mode === 3) {
      // check right only for file
      if (mode === 2) {
        await this._checkRightWrite({ atomId, user });
      }
      // file
      await this._outputFileContent({ destFile, fileContent });
    }

    // fileSize
    const stat = await fse.stat(destFile);
    const fileSize = stat.size;

    // save
    const res = await this.modelFile.insert({
      userId: user ? user.id : 0,
      downloadId,
      atomId,
      mode,
      fileSize,
      width: imgWidth,
      height: imgHeight,
      filePath: _filePath,
      fileName: _fileName,
      realName: fileInfo.name,
      fileExt: fileInfo.ext,
      encoding,
      mime,
      attachment,
      flag,
    });
    const fileId = res[0];

    // attachmentCount
    if (atomId && attachment) {
      await this.app.bean.atom.attachment({ key: { atomId }, atom: { attachment: 1 }, user });
    }

    // ok
    const downloadUrl = this.getDownloadUrl({ downloadId, mode, fileExt: fileInfo.ext });
    return {
      fileId,
      realName: fileInfo.name,
      downloadId,
      downloadUrl,
    };
  }

  async download({ downloadId, atomId, width, height, user }: any) {
    // downloadId
    if (!downloadId) this.app.throw(404);
    const extPos = downloadId.indexOf('.');
    if (extPos > -1) downloadId = downloadId.substr(0, extPos);

    // get file
    let file = await this._getFileByDownloadId({ downloadId, atomId });
    if (!file) this.app.throw(404);
    file = file!;

    // pre
    let fileName = file.fileName;
    if (file.mode === 1) {
      if (this._isSupportedImageTypes(file.fileExt)) {
        // adjust image
        fileName = await this._adjustImage(file, width, height);
      }
    } else if (file.mode === 2) {
      // check right
      await this.fileDownloadCheck({ file, user });
    } else if (file.mode === 3) {
      // do nothing
    }

    // forward url
    const forwardUrl = this.app.bean.base.getForwardUrl(`${file.filePath}/${fileName}${file.fileExt}`);

    // send
    if (!this.app.bean.base.useAccelRedirect()) {
      // redirect
      this.ctx.redirect(forwardUrl);
    } else {
      // redirect nginx
      // this.ctx.set('content-type', file.mime);
      this.ctx.set('content-transfer-encoding', file.encoding);
      this.ctx.set(
        'content-disposition',
        `attachment; filename*=UTF-8''${encodeURIComponent(file.realName)}${file.fileExt}`,
      );
      this.ctx.set('X-Accel-Redirect', forwardUrl);
      // this.app.success();
      this.ctx.response.status = 200;
      this.ctx.response.type = file.mime;
    }
  }

  async getFile({ downloadId, fileId }: any) {
    let file;
    if (downloadId) {
      const extPos = downloadId.indexOf('.');
      if (extPos > -1) downloadId = downloadId.substr(0, extPos);
      file = await this.modelFile.get({ downloadId });
    } else if (fileId) {
      file = await this.modelFile.get({ id: fileId });
    }
    return file;
  }

  // inner invoke
  async fileInfo({ downloadId, fileId }: any) {
    const file = await this.getFile({ downloadId, fileId });
    if (!file) this.app.throw(404);

    // absolutePath
    const destDir = await this.app.bean.base.getPath(file.filePath, true);
    const absolutePath = path.join(destDir, `${file.fileName}${file.fileExt}`);
    // ok
    return {
      file,
      absolutePath,
    };
  }

  async loadBuffer({ downloadId }: any) {
    const fileInfo = await this.fileInfo({ downloadId });
    const buffer = await fse.readFile(fileInfo.absolutePath);
    return {
      ...fileInfo,
      buffer,
    };
  }

  async fileUpdateCheck({ file, user }: any) {
    if (!user) {
      // check user
      await this.app.bean.user.check();
      user = this.ctx.state.user.op;
    }
    // check
    const result = await this._fileUpdateCheck({ file, user });
    if (result) return;
    this.app.throw(403);
  }

  async _fileUpdateCheck({ file, user }: any) {
    // invoke event
    return await this.scope.event.fileUpdateCheck.emit({ file, user }, async () => {
      // not check if !atomId
      if (file.atomId) {
        const res = await this.app.bean.atom.checkRightAction({
          atom: { id: file.atomId },
          action: 3,
          stage: 'draft',
          user,
          checkFlow: true,
        });
        return res && res.atomClosed === 0;
      } else {
        // check if self
        return file.userId === user.id;
      }
    });
  }

  async fileDownloadCheck({ file, user }: any) {
    if (!user) {
      // check user
      await this.app.bean.user.check();
      user = this.ctx.state.user.op;
    }
    // check
    const result = await this._fileDownloadCheck({ file, user });
    if (result) return;
    this.app.throw(403);
  }

  async _fileDownloadCheck({ file, user }: any) {
    // invoke event
    return await this.scope.event.fileDownloadCheck.emit({ file, user }, async () => {
      // not check if !atomId
      if (file.atomId) {
        const res = await this.app.bean.atom.checkRightRead({
          atom: { id: file.atomId },
          user,
          checkFlow: true,
          disableAuthOpenCheck: true,
        });
        return !!res;
      } else {
        // check if self
        return file.userId === user.id;
      }
    });
  }

  _isSupportedImageTypes(fileExt) {
    return !['.svg', '.svgz'].includes(fileExt) && ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif'].includes(fileExt);
  }

  async _adjustImage(file, widthRequire, heightRequire) {
    widthRequire = widthRequire ? parseInt(widthRequire) : 0;
    heightRequire = heightRequire ? parseInt(heightRequire) : 0;
    if (!widthRequire && !heightRequire) return file.fileName;

    // cannot use * in path on windows
    const fileName = `${file.fileName}-${widthRequire}_${heightRequire}`;
    const destFile = await this.app.bean.base.getPath(`${file.filePath}/${fileName}${file.fileExt}`, false);

    const bExists = await fse.pathExists(destFile);
    if (bExists) return fileName;

    const width = widthRequire || parseInt((file.width * heightRequire) / file.height);
    const height = heightRequire || parseInt((file.height * widthRequire) / file.width);

    const srcFile = await this.app.bean.base.getPath(`${file.filePath}/${file.fileName}${file.fileExt}`, false);

    // image
    let img = await Jimp.read(srcFile);
    img = img.resize(width, height);
    await bb.fromCallback(cb => {
      img.write(destFile, cb);
    });

    return fileName;
  }

  async _getFileByDownloadId({ downloadId, atomId }: any) {
    if (atomId) {
      return await this.modelFile.get({ downloadId, atomId });
    }
    // try to get formal
    const files = await this.modelFile.select({
      alias: 'a',
      joins: [['innerJoin', 'aAtom as b', { 'a.atomId': 'b.id' }]],
      where: {
        'a.mode': 2,
        'a.downloadId': downloadId,
        'b.atomStage': 1,
      },
    });
    const file = files[0];
    if (file) return file;
    // no matter what atomId is: maybe ===0 or !==0
    return await this.modelFile.get({ downloadId });
  }

  async _checkRightWrite({ atomId, user }: any) {
    // not check if !atomId
    if (!atomId) return;
    const res = await this.app.bean.atom.checkRightAction({
      atom: { id: atomId },
      action: 3,
      // stage: 'draft', // support formal
      user,
      checkFlow: true,
      disableAuthOpenCheck: true,
    });
    if (res && res.atomClosed === 0) return;
    this.app.throw(403);
  }

  async _outputImageContent({ destFile, fileContent, fields, fileInfo }: any) {
    // prepare image content
    const tmpFile = destFile + fileInfo.ext;
    await this._outputFileContent({ destFile: tmpFile, fileContent });
    // image
    let img = await Jimp.read(tmpFile);
    // crop
    if (fields.cropped === 'true') {
      const cropbox = JSON.parse(fields.cropbox);
      img = img.crop(parseInt(cropbox.x), parseInt(cropbox.y), parseInt(cropbox.width), parseInt(cropbox.height));
    }
    // fixed
    if (fields.fixed) {
      const fixed = JSON.parse(fields.fixed);
      if (fixed.width && fixed.height) {
        img = img.resize(fixed.width, fixed.height);
      } else if (fixed.width) {
        img = img.resize(fixed.width, Jimp.AUTO);
      } else if (fixed.height) {
        img = img.resize(Jimp.AUTO, fixed.height);
      }
    }
    // quality
    if (['.png', '.jpg', '.jpeg'].includes(fileInfo.ext)) {
      img = img.quality(93);
    }
    // save
    await bb.fromCallback(cb => {
      img.write(destFile, cb);
    });
    // size
    const width = img.bitmap.width;
    const height = img.bitmap.height;
    // delete tmp file
    await fse.remove(tmpFile);
    // ready
    return { width, height };
  }

  async _outputFileContent({ destFile, fileContent }: any) {
    if (Buffer.isBuffer(fileContent)) {
      // buffer
      await fse.outputFile(destFile, fileContent as any);
    } else {
      // stream
      const writeStream = fs.createWriteStream(destFile);
      await bb.fromCallback(cb => {
        pump(fileContent, writeStream, cb);
      });
    }
  }

  getDownloadUrl({ downloadId, atomId, mode, fileExt }: any) {
    let url = `/api/a/file/file/download/${downloadId}${mode === 1 || mode === 3 ? fileExt : ''}`;
    if (atomId) {
      url = `${url}?atomId=${atomId}`;
    }
    return this.app.bean.base.getAbsoluteUrl(url);
  }
}
