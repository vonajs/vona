import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';

const __SeparatorCode = '/';

@Bean()
export class BeanDict extends BeanModuleScopeBase {
  get cacheMem() {
    return this.scope._bean.cacheMem;
  }

  get atomClass() {
    return {
      module: __ThisModule__,
      atomClassName: 'dict',
    };
  }

  get model() {
    return this.scope.model.dict;
  }

  get modelDictContent() {
    return this.scope.model.dictContent;
  }

  // options: separator
  //  find by code or title
  async findItem({ dictKey, code: codeFull, title, options }: any) {
    let findByCode;
    if (!this._checkIfEmptyForSelect(codeFull)) {
      codeFull = String(codeFull);
      // trim ending /
      if (codeFull.charAt(codeFull.length - 1) === '/') {
        codeFull = codeFull.substring(0, codeFull.length - 1);
      }
      findByCode = true;
    } else if (title) {
      findByCode = false;
    } else {
      return null;
    }
    // options
    options = options || { separator: '/' };
    const separator = options.separator;
    // locale
    const locale = this.ctx.locale;
    // dict
    const dict = await this.getDict({ dictKey, locale });
    if (!dict._cacheCode) dict._cacheCode = {};
    if (!dict._cacheTitle) dict._cacheTitle = {};
    let dictItemRes = findByCode ? dict._cacheCode[codeFull] : dict._cacheTitle[title];
    if (dictItemRes) return dictItemRes;
    // find
    const dictItemsRes: any[] = [];
    const res = this._findItem_loop({
      dictItemsRes,
      dictItems: dict._dictItems,
      dictItemsMap: dict._dictItemsMap,
      codes: findByCode ? codeFull.split(__SeparatorCode) : undefined,
      titles: findByCode ? undefined : title.split(separator),
      findByCode,
    });
    if (!res) return null;
    const titleFull = dictItemsRes.map(item => item.title).join(separator);
    const titleLocaleFull = dictItemsRes.map(item => item.titleLocale).join(separator);
    dictItemRes = {
      ...dictItemsRes[dictItemsRes.length - 1],
      titleFull,
      titleLocaleFull,
    };
    // cache
    if (findByCode) {
      dict._cacheCode[codeFull] = dictItemRes;
    } else {
      dict._cacheTitle[title] = dictItemRes;
    }
    // ok
    return dictItemRes;
  }

  _findItem_loop({ dictItemsRes, dictItems, dictItemsMap, codes, titles, findByCode }: any) {
    let dictItem;
    if (findByCode) {
      const code = codes.shift();
      dictItem = dictItemsMap && dictItemsMap[code];
      if (!dictItem) return false;
      dictItemsRes.push(dictItem);
      if (codes.length === 0) return true;
    } else {
      const title = titles.shift();
      dictItem = dictItems && dictItems.find(item => item.title === title || item.titleLocale === title);
      if (!dictItem) return false;
      dictItemsRes.push(dictItem);
      if (titles.length === 0) return true;
    }
    const childrenMapKey = `${dictItem.code}:childrenMap`;
    return this._findItem_loop({
      dictItemsRes,
      dictItems: dictItem.children,
      dictItemsMap: dictItemsMap[childrenMapKey],
      codes,
      titles,
      findByCode,
    });
  }

  async getDict({ dictKey, locale }: any) {
    locale = locale || this.ctx.locale;
    let dict = this.cacheMem.get(dictKey);
    if (dict && dict[locale]) return dict[locale];
    if (!dict) {
      dict = {};
    }
    if (!dict[locale]) {
      dict[locale] = await this._prepareDict({ dictKey, locale });
    }
    this.cacheMem.set(dictKey, dict);
    return dict[locale];
  }

  dictCacheRemove({ dictKey }: any) {
    this.cacheMem.remove(dictKey);
  }

  async _prepareDict({ dictKey, locale }: any) {
    // load
    const dict = await this._prepareDict_load({ dictKey, user: null, returnDict: true });
    // prepare
    this._prepareDict_adjust({ dict, locale });
    // ok
    return dict;
  }

  async _prepareDict_load({ dictKey, user, returnDict }: any) {
    if (!dictKey) throw new Error('dictKey not set');
    // get atomId
    let atomId;
    const atomClass = await this.app.bean.atomClass.get(this.atomClass);
    const atom = await this.app.bean.atom.modelAtom.get({
      atomClassId: atomClass.id,
      atomStaticKey: dictKey,
      atomStage: 1,
    });
    if (!atom) {
      // try preload
      const atomKey = await this.app.bean.atomStatic.preloadAtomStatic({ atomStaticKey: dictKey });
      if (!atomKey) throw new Error(`dict not found: ${dictKey}`);
      atomId = atomKey.atomId;
    } else {
      atomId = atom.id;
    }
    // check resource right
    if (user) {
      const res = await this.app.bean.resource.checkRightResource({ resourceAtomId: atomId, user });
      if (!res) this.app.throw(403);
    }
    if (!returnDict) return true;
    // read
    const dict = await this.app.bean.atom.read({ key: { atomId } });
    if (!dict) return this.$scope.base.error.ElementDoesNotExist.throw();
    // ok
    return dict;
  }

  _prepareDict_adjust({ dict, locale }: any) {
    // init
    dict._dictItems = JSON.parse(dict.dictItems);
    dict._dictLocales = dict.dictLocales ? JSON.parse(dict.dictLocales) : null;
    dict._dictItemsMap = {};
    // adjust
    this._prepareDict_adjust_loop({
      dict,
      dictItemsMap: dict._dictItemsMap,
      dictItems: dict._dictItems,
      locale,
      itemParent: null,
    });
  }

  _prepareDict_adjust_loop({ dict, dictItemsMap, dictItems, locale, itemParent }: any) {
    for (const item of dictItems) {
      // codeFull
      let codeFull = itemParent ? `${itemParent.codeFull}${item.code}` : item.code;
      if (item.children) {
        codeFull = `${codeFull}/`;
      }
      item.codeFull = codeFull;
      // self
      item.titleLocale = this._prepareDict_titleLocale({ dict, title: item.title, locale });
      dictItemsMap[item.code] = item;
      // children
      if (item.children) {
        const childrenMapKey = `${item.code}:childrenMap`;
        dictItemsMap[childrenMapKey] = {};
        this._prepareDict_adjust_loop({
          dict,
          dictItemsMap: dictItemsMap[childrenMapKey],
          dictItems: item.children,
          locale,
          itemParent: item,
        });
      }
    }
  }

  _prepareDict_titleLocale({ dict, title, locale }: any) {
    return this.app.bean.util.getTitleLocale({
      locales: dict._dictLocales,
      title,
      locale,
    });
  }

  _checkIfEmptyForSelect(value) {
    return value === '' || value === undefined || value === null;
  }
}
