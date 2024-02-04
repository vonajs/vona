import { BeanBase } from '../../beanBase.js';
import { IModelOptions } from './type.js';
import { IDecoratorModelOptions } from '../../../decorator/index.js';
export declare class BeanModelBaseInner extends BeanBase {
    protected get __beanOptions(): import("../../../decorator/index.js").IDecoratorBeanOptionsBase<unknown> | undefined;
    protected get __modelOptions(): IDecoratorModelOptions;
    get table(): string;
    get options(): IModelOptions;
    get disableDeleted(): any;
    get disableInstance(): any;
    columns(tableName?: string): Promise<any>;
    columnsClear(tableName: any): any;
    columnsClearAll(): boolean;
    prepareData(item: any): Promise<{}>;
    default(data?: any): Promise<any>;
    _coerceTypeOfDefault(column: any): any;
    create(data: any, ...args: any[]): Promise<any>;
    write(data: any, ...args: any[]): Promise<any>;
    _rowCheck(row: any): void;
    _insertRowsCheck(rows: any): void;
    query(...args: any[]): Promise<any>;
    queryOne(...args: any[]): Promise<any>;
    select(...args: any[]): Promise<any>;
    count(...args: any[]): Promise<any>;
    get(...args: any[]): Promise<any>;
    insert(...args: any[]): Promise<any>;
    update(...args: any[]): Promise<any>;
    delete(...args: any[]): Promise<any>;
}
//# sourceMappingURL=beanModelBaseInner.d.ts.map