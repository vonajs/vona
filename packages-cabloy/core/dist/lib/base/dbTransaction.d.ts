import { CabloyContext } from '../../types/index.js';
export default class DbTransaction {
    _ctx: CabloyContext;
    _transactionCounter: number;
    _connection: any;
    constructor(ctx: any);
    get inTransaction(): boolean;
    get connection(): any;
    set connection(value: any);
    begin(fn: any): Promise<any>;
}
//# sourceMappingURL=dbTransaction.d.ts.map