import { BeanFlowDefFind } from './bean.flowDef_find.js';

export class BeanFlowDefUtils extends BeanFlowDefFind {
  _calcConditionExpressionLevel({ conditionExpression }) {
    if (!conditionExpression && conditionExpression !== false) return 3;
    if (conditionExpression === false) return 2;
    return 1;
  }
}
