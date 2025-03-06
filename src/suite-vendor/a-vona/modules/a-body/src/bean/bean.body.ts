import parse from 'co-body';
import copy from 'copy-to';
import typeis from 'type-is';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanBody extends BeanBase {
  parse() {

  }

  private async _parseBody(ctx) {
    if (
      enableJson &&
      ((detectJSON && detectJSON(ctx)) ||
        isTypes(ctx.request.get('content-type'), jsonTypes))
    ) {
      return await parse.json(ctx, jsonOpts);
    }

    if (enableForm && ctx.request.is(formTypes)) {
      return await parse.form(ctx, formOpts);
    }

    if (enableText && ctx.request.is(textTypes)) {
      return (await parse.text(ctx, textOpts)) || '';
    }

    if (enableXml && ctx.request.is(xmlTypes)) {
      return (await parse.text(ctx, xmlOpts)) || '';
    }

    return {};
  }
}

function formatOptions(opts, type) {
  const res = {};
  copy(opts).to(res);
  res.limit = opts[`${type}Limit`];
  return res;
}

function extendType(original, extend) {
  if (extend) {
    if (!Array.isArray(extend)) {
      extend = [extend];
    }

    extend.forEach(extend => {
      original.push(extend);
    });
  }
}

function checkEnable(types, type) {
  return types.includes(type);
}

function isTypes(contentTypeValue, types) {
  if (typeof contentTypeValue === 'string') {
    // trim extra semicolon
    contentTypeValue = contentTypeValue.replace(/;$/, '');
  }

  return typeis.is(contentTypeValue, types);
}
