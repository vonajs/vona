import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceTag extends BeanBase {
  async list({ atomClass, options }: any) {
    return await this.app.bean.tag.list({ atomClass, options });
  }

  async add({ atomClass, data }: any) {
    return await this.app.bean.tag.add({ atomClass, data });
  }

  async delete({ tagId }: any) {
    return await this.app.bean.tag.delete({ tagId });
  }

  async save({ tagId, data }: any) {
    return await this.app.bean.tag.save({ tagId, data });
  }
}
