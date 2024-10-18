import { BeanBase, Local } from 'vona';

@Local()
export class LocalTag extends BeanBase {
  async list({ atomClass, options }: any) {
    return await this.ctx.bean.tag.list({ atomClass, options });
  }

  async add({ atomClass, data }: any) {
    return await this.ctx.bean.tag.add({ atomClass, data });
  }

  async delete({ tagId }: any) {
    return await this.ctx.bean.tag.delete({ tagId });
  }

  async save({ tagId, data }: any) {
    return await this.ctx.bean.tag.save({ tagId, data });
  }
}
