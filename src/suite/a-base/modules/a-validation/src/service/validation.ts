import { BeanBase, Service } from 'vona';

@Service()
export class ServiceValidation extends BeanBase {
  schema({ module, validator, schema }: any) {
    return this.ctx.bean.validation.getSchema({ module, validator, schema });
  }
  async validate({ params, data }: any) {
    const { module, validator, schema } = params;
    await this.ctx.bean.validation._validate({
      atomClas: null,
      data,
      options: {
        schema: { module, validator, schema },
      },
      filterOptions: {
        type: true,
        ebReadOnly: true,
      },
    });
    return { data };
  }
}
