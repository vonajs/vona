import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
const gTestListMax = 89;

@Controller()
export class ControllerKitchenSinkPtrIsLoadmore extends BeanBase {
  async list() {
    // page
    let page = this.ctx.request.body.page;
    // adjust page
    page = this.app.bean.util.page(page, false);
    // items
    const items: any[] = [];
    for (let i = 0; i < page.size; i++) {
      const itemId = page.index + i + 1;
      if (itemId > gTestListMax) break;
      items.push({
        id: itemId,
        title: `${this.app.text('Item')} - ${itemId}`,
      });
    }
    // ok
    this.app.successMore(items, page.index, page.size);
  }
}
