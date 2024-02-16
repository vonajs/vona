import product from './schema/product.js';
import purchaseOrder from './schema/purchaseOrder.js';
import purchaseOrderDetail from './schema/purchaseOrderDetail.js';
import payMoney from './schema/payMoney.js';
import receiveGoods from './schema/receiveGoods.js';

const schemas: any = {};
// product
Object.assign(schemas, product);
// purchase order
Object.assign(schemas, purchaseOrder);
// purchase order detail
Object.assign(schemas, purchaseOrderDetail);
// payMoney
Object.assign(schemas, payMoney);
// receiveGoods
Object.assign(schemas, receiveGoods);
// ok
export default schemas;
