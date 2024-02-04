import { BeanSimple } from '../bean/beanSimple.js';
export declare class Model extends BeanSimple {
    table: string;
    options: any;
    constructor({ table, options }: {
        table: any;
        options?: {} | undefined;
    });
    get disableDeleted(): any;
    get disableInstance(): any;
    columns(tableName?: string): Promise<any>;
    columnsClear(tableName: any): any;
    columnsClearAll(): boolean;
    prepareData(item: any): Promise<{}>;
    default(data: any): Promise<any>;
    _coerceTypeOfDefault(column: any): any;
    create(data: any, ...args: any[]): Promise<any>;
    write(data: any, ...args: any[]): Promise<any>;
    _rowCheck(row: any): void;
    _insertRowsCheck(rows: any): void;
}
//# sourceMappingURL=model.d.ts.map