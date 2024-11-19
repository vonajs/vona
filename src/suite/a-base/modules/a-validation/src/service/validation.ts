import { BeanBase, Service } from 'vona';

@Service()
export class ServiceValidation extends BeanBase {
  schema({ module, validator, schema }: any) {
    return this.app.bean.validation.getSchema({ module, validator, schema });
  }
  async validate({ params, data }: any) {
    const { module, validator, schema } = params;
    await this.app.bean.validation._validate({
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
