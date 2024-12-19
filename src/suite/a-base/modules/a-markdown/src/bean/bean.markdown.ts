import { Bean } from 'vona-module-a-bean';
import { BeanBase, requireDynamic } from 'vona';

import path from 'path';

import Markdownit from '@zhennann/markdown';
import markdown_it_block from '@zhennann/markdown-it-block';

@Bean()
export class BeanMarkdown extends BeanBase {
  async render({ host, content, locale }: any) {
    if (!content) return '';
    // asyncs
    const asyncs: any = {};
    // block options
    const blockOptions = {
      utils: {
        text: (text, ...args) => {
          return this.app.text.locale(locale || this.ctx.app.config.i18n.defaultLocale, text, ...args);
        },
        register: ({ params, content }) => {
          const placeholder = `__markdown_block_placeholder__${this.app.bean.util.uuidv4()}`;
          asyncs[placeholder] = { params, content };
          return placeholder;
        },
      },
    };
    // md
    const md = Markdownit.create().use(markdown_it_block, blockOptions);
    // render
    let html = md.render(content);
    // render async
    for (const placeholder in asyncs) {
      const { params, content } = asyncs[placeholder];
      const [module, blockName] = params.split(':');
      if (!module || !blockName) throw new Error(`Invalid Markdown Block: ${params}`);
      const _module = this.ctx.app.meta.modules[module];
      if (!_module) throw new Error(`Module Not Found: ${module}`);
      let block_js = path.join(_module.root, 'static', `blocks/${blockName}/main`);
      if (this.ctx.app.meta.isProd) {
        block_js += '.min';
      }
      block_js += '.cjs';
      const BlockClass = requireDynamic(block_js);
      // render
      const blockHost = this._getHost({ host, content, locale });
      // Block Instance
      const blockInstance = new BlockClass(blockHost);
      let blockHtml = '';
      if (blockInstance.render) {
        blockHtml = await blockInstance.render();
      }
      // eslint-disable-next-line
      const dataContent = encodeURIComponent(JSON5.stringify(content, null, 2));
      blockHtml = `
<div class="markdown-it-cabloy-block" data-block-params="${params}" data-block-content="${dataContent}">
  ${blockHtml}
</div>
`;
      // replace
      const regexp = new RegExp(placeholder);
      html = html.replace(regexp, blockHtml);
    }
    // ok
    return html;
  }

  _getHost({ host, content, locale }: any) {
    const $util = this.app.bean.util.hostUtil({
      locale: locale || this.app.bean.util.getProperty(host, 'atom.atomLanguage'),
    });
    return {
      $host: host, // atomId/atom
      $content: content,
      $util,
    };
  }
}
