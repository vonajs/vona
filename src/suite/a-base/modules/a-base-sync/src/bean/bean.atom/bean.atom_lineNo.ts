import { BeanAtomUtils } from './bean.atom_utils.js';

export class BeanAtomLineNo extends BeanAtomUtils {
  async moveUp({ key, atomClass, options, user }) {
    return await this._moveLineNo({ key, atomClass, options, user, direction: 'up' });
  }

  async moveDown({ key, atomClass, options, user }) {
    return await this._moveLineNo({ key, atomClass, options, user, direction: 'down' });
  }

  async _moveLineNo({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user, direction }) {
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
    // model
    const modelItem = this.ctx.model.module(atomClass.module)[atomClassBase.model];
    // table
    const tableName = atomClassBase.tableName;
    // field: lineNo
    const fieldNameLineNo = atomClassBase.fields?.mappings?.lineNo;
    // field: atomIdMain
    const fieldNameAtomIdMain = atomClassBase.fields?.mappings?.atomIdMain;
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
    const atomTo = await this.ctx.model.queryOne(sql, [
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
