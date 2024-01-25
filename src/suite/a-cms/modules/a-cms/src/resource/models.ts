export * from '../model/article.js';
export * from '../model/content.js';

import { ModelArticle } from '../model/article.js';
import { ModelContent } from '../model/content.js';

export interface IModuleModel {
  article: ModelArticle;
  content: ModelContent;
}
