import React from 'react';

export function jsxEnhance() {
  const createElementOriginal = React.createElement as any;
  React.createElement = function (...args: any[]) {
    const component = createElementOriginal(...args);
  } as any;
}

function _translateJsxRender(component: any) {
  const componentNew: any = {};
  componentNew.$$typeof = 'zova-jsx';
  componentNew.type = typeof component.type === 'function' ? component.type() : component.type;
  componentNew.key = component.key;
  componentNew.props = { ...component.props };
  const children = componentNew.props.children;
  if (children) {
    if (Array.isArray(children)) {
      componentNew.props.children = children.map(item => this._translateJsxRender(item));
    } else if (typeof children === 'object' && !children.toJSON) {
      componentNew.props.children = this._translateJsxRender(children);
    }
  }
  return componentNew;
}
