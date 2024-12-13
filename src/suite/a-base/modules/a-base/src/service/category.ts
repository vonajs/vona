import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceCategory extends BeanBase {
  async child({ atomClass, language, categoryId, categoryName, categoryHidden, categoryFlag, setLocale, user }: any) {
    return await this.app.bean.category.child({
      atomClass,
      language,
      categoryId,
      categoryName,
      categoryHidden,
      categoryFlag,
      setLocale,
      user,
    });
  }

  async children({
    atomClass,
    language,
    categoryId,
    categoryName,
    categoryHidden,
    categoryFlag,
    setLocale,
    user,
  }: any) {
    return await this.app.bean.category.children({
      atomClass,
      language,
      categoryId,
      categoryName,
      categoryHidden,
      categoryFlag,
      setLocale,
      user,
    });
  }

  async tree({ atomClass, language, categoryId, categoryHidden, categoryFlag, setLocale, user }: any) {
    return await this.app.bean.category.tree({
      atomClass,
      language,
      categoryId,
      categoryHidden,
      categoryFlag,
      setLocale,
      user,
    });
  }

  async add({ atomClass, data }: any) {
    return await this.app.bean.category.add({ atomClass, data });
  }

  async delete({ categoryId }: any) {
    return await this.app.bean.category.delete({ categoryId });
  }

  async move({ categoryId, categoryIdParent }: any) {
    return await this.app.bean.category.move({ categoryId, categoryIdParent });
  }

  async item({ categoryId, setLocale }: any) {
    return await this.app.bean.category.get({ categoryId, setLocale });
  }

  async save({ categoryId, data }: any) {
    return await this.app.bean.category.save({ categoryId, data });
  }

  async relativeTop({ categoryId, setLocale }: any) {
    return await this.app.bean.category.relativeTop({ categoryId, setLocale });
  }

  async parseCategoryName({ atomClass, language, categoryName, categoryIdParent, force }: any) {
    return await this.app.bean.category.parseCategoryName({
      atomClass,
      language,
      categoryName,
      categoryIdParent,
      force,
    });
  }
}
