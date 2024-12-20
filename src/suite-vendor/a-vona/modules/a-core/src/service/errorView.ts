import path from 'node:path';
import fs from 'node:fs';
import { BeanBase, cast } from 'vona';
import { Service } from 'vona-module-a-web';
import Mustache from 'mustache';
import * as StackTrace from 'stack-trace';
import cookie from 'cookie';
import util from 'node:util';

const startingSlashRegex = /\\|\//;

@Service()
export class ServiceErrorView extends BeanBase {
  private error: Error;
  private viewTemplate: string;

  private codeContext = 5;
  private _filterHeaders = ['cookie', 'connection'];
  private assets = new Map();

  protected __init__(error: Error, template: string) {
    this.error = error;
    this.viewTemplate = template;
  }

  toHTML() {
    const stack = this.parseError();
    const data = this.serializeData(stack, (frame, index) => {
      const serializedFrame = this.serializeFrame(frame) as any;
      serializedFrame.classes = this.getFrameClasses(frame, index);
      return serializedFrame;
    }) as any;

    data.request = this.serializeRequest();
    data.appInfo = this.serializeAppInfo();

    data.meta = {
      errorLogo: this.scope.util.combineStaticPath('img/vona.svg'),
    };

    return this.complieView(this.viewTemplate, data);
  }

  complieView(tpl, locals) {
    return Mustache.render(tpl, locals);
  }

  isNode(frame) {
    if (frame.isNative()) {
      return true;
    }
    const filename = frame.getFileName() || '';
    return !path.isAbsolute(filename) && filename[0] !== '.';
  }

  isApp(frame) {
    if (this.isNode(frame)) {
      return false;
    }
    const filename = frame.getFileName() || '';
    return !filename.includes('node_modules' + path.sep);
  }

  setAssets(key, value) {
    this.assets.set(key, value);
  }

  getAssets(key) {
    this.assets.get(key);
  }

  getFrameSource(frame) {
    const filename = frame.getFileName();
    const lineNumber = frame.getLineNumber();
    let contents = this.getAssets(filename) as any;
    if (!contents) {
      contents = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '';
      this.setAssets(filename, contents);
    }
    const lines = contents.split(/\r?\n/);

    return {
      pre: lines.slice(Math.max(0, lineNumber - (this.codeContext + 1)), lineNumber - 1),
      line: lines[lineNumber - 1],
      post: lines.slice(lineNumber, lineNumber + this.codeContext),
    };
  }

  parseError() {
    const stack = StackTrace.parse(this.error);
    return stack.map(frame => {
      if (!this.isNode(frame)) {
        frame.context = this.getFrameSource(frame);
      }
      return frame;
    });
  }

  getContext(frame) {
    if (!frame.context) {
      return {};
    }

    return {
      start: frame.getLineNumber() - (frame.context.pre || []).length,
      pre: frame.context.pre.join('\n'),
      line: frame.context.line,
      post: frame.context.post.join('\n'),
    };
  }

  getFrameClasses(frame, index) {
    const classes: string[] = [];
    if (index === 0) {
      classes.push('active');
    }

    if (!this.isApp(frame)) {
      classes.push('native-frame');
    }

    return classes.join(' ');
  }

  serializeFrame(frame) {
    const filename = frame.getFileName();
    const relativeFileName = filename.includes(process.cwd())
      ? filename.replace(process.cwd(), '').replace(startingSlashRegex, '')
      : filename;
    const extname = path.extname(filename).replace('.', '');

    return {
      extname,
      file: relativeFileName,
      method: frame.getFunctionName(),
      line: frame.getLineNumber(),
      column: frame.getColumnNumber(),
      context: this.getContext(frame),
    };
  }

  serializeData(stack, frameFomatter) {
    const code = this.error.code;
    let message = this.app.meta.util.detectErrorMessage(this.error);
    if (code) {
      message = `${message} (code: ${code})`;
    }
    return {
      code,
      message,
      name: this.error.name,
      status: this.error.status,
      frames: stack instanceof Array ? stack.filter(frame => frame.getFileName()).map(frameFomatter) : [],
    };
  }

  serializeRequest() {
    const headers: Array<{ key: string; value: string | string[] | undefined }> = [];

    Object.keys(this.ctx.request.headers).forEach(key => {
      if (this._filterHeaders.includes(key)) {
        return;
      }
      headers.push({
        key,
        value: this.ctx.request.headers[key],
      });
    });

    const parsedCookies = cookie.parse(this.ctx.request.headers.cookie || '');
    const cookies = Object.keys(parsedCookies).map(key => {
      return { key, value: parsedCookies[key] };
    });

    return {
      url: this.ctx.request.url,
      httpVersion: cast(this.ctx.request).httpVersion,
      method: this.ctx.request.method,
      connection: this.ctx.request.headers.connection,
      headers,
      cookies,
    };
  }

  serializeAppInfo() {
    let config = this.app.config;
    if (typeof cast(this.app).dumpConfigToObject === 'function') {
      config = cast(this.app).dumpConfigToObject().config.config;
    }
    return {
      baseDir: this.app.config.baseDir,
      config: util.inspect(config),
    };
  }
}
