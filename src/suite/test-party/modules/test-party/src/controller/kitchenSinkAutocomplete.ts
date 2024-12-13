mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import languages from './data/autocomplete-languages.json' with { type: 'json' };

@Controller()
export class ControllerKitchenSinkAutocomplete extends BeanBase {
  async languages() {
    const query = this.ctx.params.query;
    let data;
    if (!query) {
      data = [];
    } else {
      data = languages.filter(item => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
    this.app.success(data);
  }
}
