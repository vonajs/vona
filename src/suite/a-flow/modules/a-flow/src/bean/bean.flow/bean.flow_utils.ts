import { BeanFlowStart } from './bean.flow_start.js';

export class BeanFlowUtils extends BeanFlowStart {
  evaluateExpression({ expression, globals }: any) {
    return this.ctx.bean.util.evaluateExpression({ expression, globals });
  }

  async executeService({ bean, parameterExpression, parameter, globals }: any) {
    if (parameterExpression !== undefined) {
      parameter = this.evaluateExpression({ expression: parameterExpression, globals });
    }
    return await this._executeServiceInner({ bean, parameter, globals });
  }

  async _executeServiceInner({ bean, parameter, globals }: any) {
    if (!bean) throw new Error('flow service bean is not set');
    // bean
    const beanFullName = `${bean.module}.flow.service.${bean.name}`;
    const beanInstance = this.ctx.bean._getBean(beanFullName);
    if (!beanInstance) throw new Error(`bean not found: ${beanFullName}`);
    if (Object.getPrototypeOf(Object.getPrototypeOf(beanInstance)).constructor.name !== 'BeanFlowServiceBase') {
      throw new Error(`bean should extends FlowServiceBase: ${beanFullName}`);
    }
    // context
    const context = Object.assign({}, globals);
    if (parameter !== undefined) {
      context.parameter = parameter;
    }
    return await (<any>beanInstance).execute(context);
  }
}
