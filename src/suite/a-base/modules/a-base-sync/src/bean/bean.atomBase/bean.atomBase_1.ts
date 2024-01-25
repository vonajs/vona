import { BeanAtomBase0 } from './bean.atomBase_0.js';

export class BeanAtomBase1 extends BeanAtomBase0 {
  _ensureItemMeta(item) {
    if (!item) return null;
    if (!item._meta) item._meta = {};
    if (!item._meta.flags) item._meta.flags = [];
    return item._meta;
  }

  _appendRevisionToHistory({ items, item, atomClassBase }) {
    if (atomClassBase && atomClassBase.itemOnly) return;
    // items
    if (item) {
      items = [item];
    }
    // set
    for (item of items) {
      if (!item.atomRevision || item.atomStage !== 2) continue;
      const meta = this._ensureItemMeta(item);
      meta.flags.push(`Rev.${item.atomRevision}`);
    }
  }

  async _atomStateTranslate({ items, item, atomClassBase }) {
    if (atomClassBase && atomClassBase.itemOnly) return;
    // items
    if (item) {
      items = [item];
    }
    // set
    for (item of items) {
      await this._atomStateTranslate_item({ item });
    }
  }

  async _atomStateTranslate_item({ item }) {
    // atomState
    const atomState = item.atomState;
    if (atomState === undefined || atomState === null) return;
    // dictItem
    const dictItem = await this.ctx.bean.atomState.findDictItem({
      atomClass: { module: item.module, atomClassName: item.atomClassName },
      atomStage: item.atomStage,
      atomState,
    });
    if (!dictItem) return;
    // res
    item._atomStateTitle = dictItem.title;
    item._atomStateTitleLocale = dictItem.titleLocale;
    // item._atomStateTitle = dictItem.titleFull;
    // item._atomStateTitleLocale = dictItem.titleLocaleFull;
  }

  async _dictTranslate({ items, item, atomClass, atomClassBase }) {
    if (!atomClass && !atomClassBase) return;
    if (!atomClassBase) {
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    }
    // items
    if (item) {
      items = [item];
    }
    // set
    for (item of items) {
      await this._dictTranslate_item({ item, atomClassBase });
    }
  }

  async _dictTranslate_item({ item, atomClassBase }) {
    const fields = atomClassBase?.fields?.dicts;
    for (const fieldName in fields) {
      if (fieldName === 'atomState') continue;
      const field = fields[fieldName];
      const code = item[fieldName];
      await this._dictTranslateField({ item, fieldName, code, field });
    }
  }

  _dictTranslateField_getDickKey({ item, field }) {
    const dictKey = field.dictKey;
    if (dictKey) return dictKey;
    const dictKeyFrom = field.dictKeyFrom;
    if (!dictKeyFrom) return null;
    const fromOptions = item[`_${dictKeyFrom}Options`];
    return fromOptions?.dictKey;
  }

  async _dictTranslateField({ item, fieldName, code, field }) {
    if (field.translate === false) return null;
    if (code === undefined) return null;
    // dictKey
    const dictKey = this._dictTranslateField_getDickKey({ item, field });
    if (!dictKey) return null;
    // dictItem
    const dictItem = await this.ctx.bean.dict.findItem({
      dictKey,
      code,
      options: {
        separator: field.separator,
      },
    });
    if (!dictItem) return null;
    // res
    item[`_${fieldName}Title`] = dictItem.titleFull;
    item[`_${fieldName}TitleLocale`] = dictItem.titleLocaleFull;
    if (dictItem.options) {
      item[`_${fieldName}Options`] = dictItem.options;
    }
    return item;
  }

  _atomDisabledTranslate({ items, item, atomClassBase }) {
    if (atomClassBase && atomClassBase.itemOnly) return;
    // items
    if (item) {
      items = [item];
    }
    // set
    for (item of items) {
      this._atomDisabledTranslate_item({ item });
    }
  }

  _atomDisabledTranslate_item({ item }) {
    //
    if (!item.atomDisabled) return;
    //
    const actionBase = this.ctx.bean.base.action({
      module: item.module,
      atomClassName: item.atomClassName,
      name: 'disable',
    });
    const title = this.ctx.bean.util.getProperty(actionBase, 'params.atomDisabled.title') || 'Disabled';
    const meta = this._ensureItemMeta(item);
    meta.flags.push(this.ctx.text(title));
  }

  async _atomCategoryIdTranslate({ items, item, atomClassBase }) {
    if (atomClassBase && atomClassBase.itemOnly) return;
    // items
    if (item) {
      items = [item];
    }
    // categoryIdsWant
    const categoryIdsWantMap = {};
    for (item of items) {
      const categoryId = item.atomCategoryId;
      if (categoryId) {
        categoryIdsWantMap[categoryId] = true;
      }
    }
    const categoryIdsWant = Object.keys(categoryIdsWantMap).map(categoryId => parseInt(categoryId));
    if (categoryIdsWant.length === 0) return;
    // select
    const categoriesWant = await this.ctx.bean.category.model.mget(categoryIdsWant);
    // set
    for (item of items) {
      const categoryId = item.atomCategoryId;
      if (!categoryId) continue;
      const category = categoriesWant.find(item => item.id === categoryId);
      if (!category) continue;
      item.atomCategoryName = category.categoryName;
    }
  }

  async _userIdsTranslate({ items, item, atomClassBase }) {
    // userIdsKey
    let userIdsKey = atomClassBase?.fields?.mappings?.userIds || [];
    if (!Array.isArray(userIdsKey)) {
      userIdsKey = userIdsKey.split(',');
    }
    userIdsKey.push('userIdCreated');
    userIdsKey.push('userIdUpdated');
    // items
    if (item) {
      items = [item];
    }
    // userIdsWant
    const userIdsWantMap = {};
    for (item of items) {
      for (const userIdKey of userIdsKey) {
        const userId = item[userIdKey];
        if (userId) {
          userIdsWantMap[userId] = true;
        }
      }
    }
    // select userInfos
    let usersWant;
    const userIdsWant = Object.keys(userIdsWantMap).map(userId => parseInt(userId));
    if (userIdsWant.length === 0) {
      usersWant = [];
    } else {
      usersWant = await this.ctx.bean.user.model.mget(userIdsWant);
    }
    // special for system user
    usersWant.push({ id: 0, userName: this.ctx.text('system') });
    // set
    for (item of items) {
      for (const userIdKey of userIdsKey) {
        const userId = item[userIdKey];
        if (userId === undefined || userId === null) continue;
        const user = usersWant.find(item => item.id === userId);
        if (!user) continue;
        if (userIdKey === 'userIdCreated') {
          if (item.module === 'a-base' && item.atomClassName === 'user') {
            item.userNameCreated = user.userName;
            item.avatarCreated = user.avatar;
          } else {
            item.userName = user.userName;
            item.avatar = user.avatar;
          }
        } else if (userIdKey === 'userIdUpdated') {
          item.userNameUpdated = user.userName;
          item.avatarUpdated = user.avatar;
        } else {
          item[`_${userIdKey}Name`] = user.userName;
          item[`_${userIdKey}Avatar`] = user.avatar;
        }
      }
    }
  }

  _atomNameLocaleTranslate({ items, item, atomClassBase }) {
    if (atomClassBase && atomClassBase.itemOnly) return;
    if (atomClassBase && !atomClassBase.resource) return;
    // items
    if (item) {
      items = [item];
    }
    // set
    for (item of items) {
      // atomClass
      let _atomClassBase = atomClassBase;
      if (!_atomClassBase) {
        _atomClassBase = this.ctx.bean.base.atomClass({
          module: item.module,
          atomClassName: item.atomClassName,
        });
      }
      if (!_atomClassBase.resource) continue;
      // set
      if (!item.atomNameLocale) {
        item.atomNameLocale = this.ctx.text(item.atomName);
      }
    }
  }

  _atomLanguageLocaleTranslate({ items, item, atomClassBase }) {
    if (atomClassBase && atomClassBase.itemOnly) return;
    // items
    if (item) {
      items = [item];
    }
    // set
    for (item of items) {
      if (item.atomLanguage) {
        item.atomLanguageLocale = this.ctx.text(item.atomLanguage);
      }
    }
  }

  async _patchAtomClassInfo({ items, item, atomClass }) {
    // items
    if (item) {
      items = [item];
    }
    if (items.length === 0) return;
    if (atomClass) {
      await this._patchAtomClassInfo_withoutTitle({ items, atomClass });
    } else {
      await this._patchAtomClassInfo_withTitle({ items });
    }
  }

  async _patchAtomClassInfo_withoutTitle({ items, atomClass }) {
    for (const item of items) {
      item.module = atomClass.module;
      item.atomClassName = atomClass.atomClassName;
    }
  }

  async _patchAtomClassInfo_withTitle({ items }) {
    // atomClassIds
    const atomClassIds = Set.unique(items.map(item => item.atomClassId));
    // atomClasses
    const atomClasses = await this.ctx.bean.atomClass.model.mget(atomClassIds);
    for (const item of items) {
      const atomClass = atomClasses.find(atomClass => atomClass.id === item.atomClassId);
      item.module = atomClass.module;
      item.atomClassName = atomClass.atomClassName;
      // special for !atomClass
      const _atomClassBaseItem = await this.ctx.bean.atomClass.atomClass(atomClass);
      item.atomClassTitle = _atomClassBaseItem.title;
      item.atomClassTitleLocale = _atomClassBaseItem.titleLocale;
    }
  }
}
