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
    const {
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
    if (!atomClassBase) this.ctx.throw(403);
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
    // sql
    let sql;
    if (direction === 'up') {
      sql = `select a.id,a.${fieldNameLineNo} from ${tableName} a
          where a.iid=? and a.deleted=0 and a.${fieldNameAtomIdMain}=? and a.${fieldNameLineNo}<?
          order by a.${fieldNameLineNo} desc`;
    } else {
      sql = `select a.id,a.${fieldNameLineNo} from ${tableName} a
          where a.iid=? and a.deleted=0 and a.${fieldNameAtomIdMain}=? and a.${fieldNameLineNo}>?
          order by a.${fieldNameLineNo} asc`;
    }
    // to
    const atomTo = await this.bean.model.queryOne(sql, [
      this.ctx.instance.id,
      atomFrom[fieldNameAtomIdMain],
      lineNoFrom,
    ]);
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
