import { __ThisModule__ } from '../../resource/this.js';
import { BeanUser0 } from './bean.user_0.js';

const __atomClassUser = {
  module: __ThisModule__,
  atomClassName: 'user',
};

export class BeanUser1 extends BeanUser0 {
  async get(where) {
    return await this.model.get(where);
  }

  async add(
    { disabled = 0, userName, realName, email, mobile, avatar, motto, locale, anonymous = 0 }: any,
    user?,
    returnKey?,
  ) {
    // check if incomplete information
    let needCheck;
    if (anonymous) {
      needCheck = false;
    } else if (this.config.checkUserName === true) {
      needCheck = userName || email || mobile;
    } else {
      needCheck = email || mobile;
    }
    // if exists
    if (needCheck) {
      const res = await this.exists({ userName, email, mobile });
      if (res) this.scope.error.ElementExists.throw();
    }
    if (!user) {
      user = { id: 0 };
    }
    // write
    const item: any = {
      userName,
      realName,
      email,
      mobile,
      avatar,
      motto,
      locale,
      disabled,
      anonymous,
    };
    if (userName) {
      item.atomName = userName;
    }
    const userKey = await this.ctx.bean.atom.write({
      key: null,
      atomClass: __atomClassUser,
      item,
      user,
    });
    // // submit
    // await this.ctx.bean.atom.submit({
    //   key: userKey,
    //   options: { ignoreFlow: true },
    //   user,
    // });
    // user verify event
    item.id = userKey.itemId;
    item.atomId = userKey.atomId;
    item.itemId = userKey.itemId;
    await this.ctx.bean.event.invoke({
      module: __ThisModule__,
      name: 'userAdd',
      data: { user: item },
    });
    // ok
    return returnKey ? userKey : userKey.itemId;
  }

  async exists({ userName, email, mobile }: any) {
    userName = userName || '';
    email = email || '';
    mobile = mobile || '';
    if (this.config.checkUserName !== true) {
      userName = '';
    }
    // where
    const clause: any = {};
    clause.__or__ = [];
    if (userName) clause.__or__.push({ userName });
    if (email) clause.__or__.push({ email });
    if (mobile) clause.__or__.push({ mobile });
    if (clause.__or__.length === 0) return null;
    const where = this.ctx.model._where(clause);
    return await this.model.queryOne(
      `select * from aUser
            ${where} and iid=? and deleted=0`,
      [this.ctx.instance.id],
    );
  }

  async save({ user }: any) {
    // not use atom.write
    const userId = user.id;
    if (userId && Object.keys(user).length > 1) {
      await this.model.update(user);
    }
    if (user.userName) {
      const userAtomId = await this._forceUserAtomId({ userAtomId: null, userId });
      await this.ctx.bean.atom.modelAtom.update({
        id: userAtomId,
        atomName: user.userName,
      });
    }
  }

  async changeUserName({ user }: any) {
    // check allowChangeUserName
    const item = await this.get({ id: user.id });
    if (item.allowChangeUserName === 0) this.ctx.throw(403);
    // change
    user = {
      ...user,
      allowChangeUserName: 0,
      lastTimeChangeUserName: new Date(),
    };
    await this.save({ user });
  }

  async getFields({ removePrivacy }: any) {
    let fields = await this.model.columns();
    if (removePrivacy) {
      fields = this.ctx.bean.util.extend({}, fields);
      const privacyFields = this.scope.config.user.privacyFields.split(',');
      for (const privacyField of privacyFields) {
        delete fields[privacyField];
      }
    }
    return fields;
  }

  async getFieldsSelect({ removePrivacy, alias }: any) {
    const fields = await this.getFields({ removePrivacy });
    return Object.keys(fields)
      .map(item => (alias ? `${alias}.${item}` : item))
      .join(',');
  }

  async count({ options, user }: any) {
    return await this.select({ options, user, count: 1 });
  }

  async select({ options, user, pageForce = true, count = 0 }: any) {
    return await this._list({ options, user, pageForce, count });
  }

  async selectGeneral({ params, user, pageForce = true, count = 0 }: any) {
    const { query, page } = params;
    const options: any = {
      where: {
        'f.anonymous': 0,
        'f.disabled': 0,
      },
      orders: [['f.userName', 'asc']],
      page,
      removePrivacy: true,
    };
    if (query) {
      options.where.__or__ = [
        { 'f.userName': { op: 'like', val: query } },
        { 'f.realName': { op: 'like', val: query } },
        { 'f.mobile': { op: 'like', val: query } },
      ];
    }
    return await this._list({ options, user, pageForce, count });
  }

  // options: { where, orders, page, removePrivacy, ... }
  async _list({ options, user, pageForce = true, count = 0 }: any) {
    if (!options) options = {};
    // select
    const items = await this.ctx.bean.atom.select({ atomClass: __atomClassUser, options, user, pageForce, count });
    // count
    if (count) return items;
    // removePrivacy
    const removePrivacy = options.removePrivacy;
    if (!removePrivacy) return items;
    // fields
    const fields = await this.getFields({ removePrivacy });
    const fieldNames = Object.keys(fields);
    const itemsRes: any[] = [];
    for (const item of items) {
      const itemRes: any = {};
      for (const fieldName of fieldNames) {
        itemRes[fieldName] = item[fieldName];
      }
      itemRes.itemId = item.itemId;
      itemsRes.push(itemRes);
    }
    // ok
    return itemsRes;
  }

  async disable({ userAtomId, userId, disabled }: any) {
    const item = await this._forceUser({ userAtomId, userId });
    const key = { atomId: item.atomId, itemId: item.id };
    if (disabled) {
      await this.ctx.bean.atom.disable({ key, user: { id: 0 } });
    } else {
      await this.ctx.bean.atom.enable({ key, user: { id: 0 } });
    }
  }

  async delete({ userAtomId, userId }: any) {
    userAtomId = await this._forceUserAtomId({ userAtomId, userId });
    // delete this
    await this.ctx.bean.atom.delete({ key: { atomId: userAtomId } });
  }

  async _forceUserAtomId({ userAtomId, userId }: any) {
    if (!userAtomId) {
      const item = await this.get({ id: userId });
      userAtomId = item.atomId;
    }
    return userAtomId;
  }

  async _forceUserId({ userAtomId, userId }: any) {
    if (!userId) {
      const item = await this.get({ atomId: userAtomId });
      userId = item.id;
    }
    return userId;
  }

  async _forceUser({ userAtomId, userId }: any) {
    if (userAtomId) {
      return await this.get({ atomId: userAtomId });
    }
    return await this.get({ id: userId });
  }

  async _forceUserAndCheckRightRead({ userAtomId, userId, user }: any) {
    const _user = await this._forceUser({ userAtomId, userId });
    if (!_user) this.ctx.throw(403);
    if (!user || user.id === 0) return _user;
    // check
    const res = await this.ctx.bean.atom.checkRightRead({
      atom: { id: _user.atomId },
      user,
    });
    if (!res) this.ctx.throw(403);
    return _user;
  }
}

// async save({ user }: any) {
//   // userKey
//   const userAtomId = await this._forceUserAtomId({ userId: user.id });
//   const userKey = { atomId: userAtomId };
//   // item
//   const item = { ...user };
//   if (user.userName) {
//     item.atomName = user.userName;
//   }
//   await this.ctx.bean.atom.write({
//     key: userKey,
//     item,
//     user: { id: 0 },
//   });
// }

// async list({ roleId, query, anonymous, page, removePrivacy }: any) {
//   const roleJoin = roleId ? 'left join aUserRole b on a.id=b.userId' : '';
//   const roleWhere = roleId ? `and b.roleId=${this.ctx.model._formatValue(roleId)}` : '';
//   const queryLike = query ? this.ctx.model._formatValue({ op: 'like', val: query }) : '';
//   const queryWhere = query
//     ? `and ( a.userName like ${queryLike} or a.realName like ${queryLike} or a.mobile like ${queryLike} )`
//     : '';
//   const anonymousWhere = anonymous !== undefined ? `and a.anonymous=${this.ctx.model._formatValue(anonymous)}` : '';
//   const _limit = this.ctx.model._limit(page.size, page.index);
//   // fields
//   const fields = await this.getFieldsSelect({ removePrivacy, alias: 'a' });
//   // sql
//   const sql = `
//     select ${fields} from aUser a
//       ${roleJoin}
//         where a.iid=? and a.deleted=0
//               ${anonymousWhere}
//               ${roleWhere}
//               ${queryWhere}
//         order by a.userName asc
//         ${_limit}
//   `;
//   return await this.ctx.model.query(sql, [this.ctx.instance.id]);
// }
