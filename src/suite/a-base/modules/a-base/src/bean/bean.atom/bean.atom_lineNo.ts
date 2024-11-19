import { BeanAtomRightDetailRightInherit } from './bean.atom_right_detailRightInherit.js';

export class BeanAtomLineNo extends BeanAtomRightDetailRightInherit {
  async moveUp({ key, atomClass, options, user }: any) {
    return await this._moveLineNo({ key, atomClass, options, user, direction: 'up' });
  }

  async moveDown({ key, atomClass, options, user }: any) {
    return await this._moveLineNo({ key, atomClass, options, user, direction: 'down' });
  }

  async _moveLineNo({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user: _user, direction }: any) {
    // atomClass
    let {
      /* key,*/
      atom: atomFrom,
      atomClass,
      atomClassBase,
      /* options,*/
    } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    if (!atomClassBase) this.app.throw(403);
    atomClassBase = atomClassBase!;
    // model
    const modelItem = this.getScope(atomClass.module).model[atomClassBase.model];
    // table
    const tableName = atomClassBase.tableName;
    // field: lineNo
    const fieldNameLineNo = atomClassBase.fields?.mappings?.lineNo;
    if (!fieldNameLineNo) {
      throw new Error(`fields.mappings.lineNo not specified: ${atomClass.module}:${atomClass.atomClassName}`);
    }
    // field: atomIdMain
    const fieldNameAtomIdMain = atomClassBase.fields?.mappings?.atomIdMain;
    if (!fieldNameAtomIdMain) {
      throw new Error(`fields.mappings.atomIdMain not specified: ${atomClass.module}:${atomClass.atomClassName}`);
    }
    // from
    let lineNoFrom = atomFrom[fieldNameLineNo];
    if (lineNoFrom === 0) {
      lineNoFrom = 1;
    }
    // where/orders
    const where = { [fieldNameAtomIdMain]: atomFrom[fieldNameAtomIdMain] };
    let orders;
    if (direction === 'up') {
      where[fieldNameLineNo] = { op: '<', val: lineNoFrom };
      orders = [[fieldNameLineNo, 'desc']];
    } else {
      where[fieldNameLineNo] = { op: '>', val: lineNoFrom };
      orders = [[fieldNameLineNo, 'asc']];
    }
    // sql
    const items = await this.bean.model.select(tableName, {
      columns: ['id', `${fieldNameLineNo}`],
      where,
      orders,
    });
    // to
    const atomTo = items[0];
    if (!atomTo) {
      // do nothing
      return null;
    }
    // to
    let lineNoTo = atomTo[fieldNameLineNo];
    if (lineNoTo === 0) {
      lineNoTo = 1;
    }
    if (lineNoTo === lineNoFrom) {
      if (direction === 'up') {
        lineNoFrom++;
      } else {
        lineNoTo++;
      }
    }
    // switch
    await modelItem.update({ id: atomFrom.itemId, [fieldNameLineNo]: lineNoTo });
    await modelItem.update({ id: atomTo.id, [fieldNameLineNo]: lineNoFrom });
    // ok
    return {
      from: { atomId: atomFrom.atomId },
      to: { atomId: atomTo.id },
    };
  }
}
