import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../resource/this.js';
import languages from './data/autocomplete-languages.json' with { type: "json" };

@Controller()
export class ControllerKitchenSinkAutocomplete extends BeanBase<ScopeModule> {
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
    this.ctx.success(data);
  }
}
