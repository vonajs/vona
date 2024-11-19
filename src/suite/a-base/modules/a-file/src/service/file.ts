import { BeanBase, Service } from 'vona';

@Service()
export class ServiceFile extends BeanBase {
  async all({ atomClass, options, user }: any) {
    return await this.app.bean.file.all({ atomClass, options, user });
  }

  // where adjusted by controller
  async list({ key, options, user }: any) {
    return await this.app.bean.file.list({ key, options, user });
  }

  async delete({ fileId, user }: any) {
    return await this.app.bean.file.delete({ fileId, user });
  }

  async update({ fileId, data, user }: any) {
    return await this.app.bean.file.update({ fileId, data, user });
  }

  async upload({ user }: any) {
    return await this.app.bean.file.upload({ user });
  }

  async uploadDataUrl({ data, user }: any) {
    return await this.app.bean.file.uploadDataUrl({ data, user });
  }

  async download({ downloadId, atomId, width, height, user }: any) {
    return await this.app.bean.file.download({ downloadId, atomId, width, height, user });
  }

  // inner invoke
  async fileInfo({ downloadId }: any) {
    return await this.app.bean.file.fileInfo({ downloadId });
  }

  async fileUpdateCheck({ file, user }: any) {
    return await this.app.bean.file.fileUpdateCheck({ file, user });
  }

  async fileDownloadCheck({ file, user }: any) {
    return await this.app.bean.file.fileDownloadCheck({ file, user });
  }
}
