import { l as BeanInfo, Z as BeanControllerPageBase, W as createZovaComponentAsync, U as Use, ah as uuid, ae as createZovaComponentPage, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanModelBase, Model, $QueryAutoLoad } from "./a-model-DdQjWvuo.js";
import { BeanApiBase, Api } from "./a-api-DhA-gIeb.js";
import { P as createVNode, N as createTextVNode, a0 as withDirectives, a1 as vModelText, aa as withModifiers } from "./vue-CRNsYCTs.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { o as object, c as string } from "./zod-DcU_E_GK.js";
import { d as RouterLink } from "./vue-router-DwxCgNw3.js";
import "./commonjsHelper-CCIqAdii.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$4, _dec2$4, _class$4;
let ModelTodo = (_dec$4 = Model(), _dec2$4 = BeanInfo({
  module: "demo-todo"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class ModelTodo2 extends BeanModelBase {
  findAll() {
    return this.$useStateData({
      queryKey: ["list"],
      queryFn: async () => {
        return this.scope.api.todo.findAll();
      }
    });
  }
  findOne(id) {
    if (!id) return void 0;
    return this.$useStateData({
      queryKey: ["item", id],
      queryFn: async () => {
        return this.scope.api.todo.findOne(id);
      }
    });
  }
  create() {
    return this.$useMutationData({
      mutationKey: ["create"],
      mutationFn: async (body) => {
        return this.scope.api.todo.create(body);
      },
      onSuccess: () => {
        this.$invalidateQueries({
          queryKey: ["list"]
        });
      }
    });
  }
  update(id) {
    return this.$useMutationData({
      mutationKey: ["update", id],
      mutationFn: async (body) => {
        return this.scope.api.todo.update(id, body);
      },
      onSuccess: (_data, _params) => {
        this.$invalidateQueries({
          queryKey: ["list"]
        });
        this.$invalidateQueries({
          queryKey: ["item", id]
        });
      }
    });
  }
  delete(id) {
    return this.$useMutationData({
      mutationKey: ["delete", id],
      mutationFn: async () => {
        return this.scope.api.todo.delete(id);
      },
      onSuccess: (_data, _params) => {
        this.$invalidateQueries({
          queryKey: ["list"]
        });
        this.$invalidateQueries({
          queryKey: ["item", id]
        });
      }
    });
  }
}) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let ApiTodo = (_dec$3 = Api(), _dec2$3 = BeanInfo({
  module: "demo-todo"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class ApiTodo2 extends BeanApiBase {
  findAll() {
    return this.$fetch.get("/demo/todo");
  }
  findOne(id) {
    return this.$fetch.get(this.$pathTranslate("/demo/todo/{id}", {
      id
    }));
  }
  create(body) {
    return this.$fetch.post("/demo/todo", body);
  }
  update(id, body) {
    return this.$fetch.patch(this.$pathTranslate("/demo/todo/{id}", {
      id
    }), body);
  }
  delete(id) {
    return this.$fetch.delete(this.$pathTranslate("/demo/todo/{id}", {
      id
    }));
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _dec3$1, _dec4$1, _class$2, _class2$1, _descriptor$1;
function _initializerDefineProperty$1(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ZPage$1 = createZovaComponentAsync("home-base", "page");
const ControllerPageItemSchemaParams = object({
  id: string()
});
const ControllerPageItemSchemaQuery = object({});
let ControllerPageItem = (_dec$2 = Controller(), _dec2$2 = BeanInfo({
  module: "demo-todo"
}), _dec3$1 = Use(), _dec4$1 = Reflect.metadata("design:type", typeof ModelTodo === "undefined" ? Object : ModelTodo), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2$1 = class ControllerPageItem2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$1(this, "$$modelTodo", _descriptor$1, this);
    this.currentTodoId = void 0;
  }
  async __init__() {
    this.currentTodoId = this.$useComputed(() => {
      return this.$params.id;
    });
  }
  render() {
    const todoCurrent = this.$$modelTodo.findOne(this.currentTodoId);
    return createVNode(ZPage$1, null, {
      default: () => [todoCurrent?.data && createVNode("div", {
        "role": "alert",
        "class": "alert alert-info"
      }, [createVNode("div", null, [createTextVNode("Current:"), todoCurrent?.data?.title])]), !!todoCurrent?.error && createVNode("div", {
        "role": "alert",
        "class": "alert alert-error"
      }, [createVNode("span", null, [todoCurrent?.error?.message])])]
    });
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$modelTodo", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$2) || _class$2);
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ZPage = createZovaComponentAsync("home-base", "page");
let ControllerPageTodo = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "demo-todo"
}), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof ModelTodo === "undefined" ? Object : ModelTodo), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class ControllerPageTodo2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$modelTodo", _descriptor, this);
    this.newTitle = void 0;
    this.currentTodoId = void 0;
  }
  async __init__() {
    await $QueryAutoLoad(() => this.queryTodos);
  }
  get queryTodos() {
    return this.$$modelTodo.findAll();
  }
  get queryTodoCurrent() {
    return this.$$modelTodo.findOne(this.currentTodoId);
  }
  async addTodo() {
    const todo = {
      id: uuid(),
      title: this.newTitle,
      done: false
    };
    await this.$$modelTodo.create().mutateAsync(todo);
    this.newTitle = "";
  }
  async completeTodo(item) {
    const todo = {
      ...item,
      title: `${item.title}!`,
      done: true
    };
    await this.$$modelTodo.update(item.id).mutateAsync(todo);
  }
  async deleteTodo(item) {
    await this.$$modelTodo.delete(item.id).mutateAsync();
  }
  render() {
    const queryTodoCurrent = this.queryTodoCurrent;
    const queryTodos = this.queryTodos;
    return createVNode(ZPage, null, {
      default: () => [queryTodoCurrent?.data && createVNode("div", {
        "role": "alert",
        "class": "alert alert-success"
      }, [createVNode("div", null, [createTextVNode("Current:"), " ", createVNode(RouterLink, {
        "to": this.$router.getPagePath("/demo/todo/item/:id", {
          params: {
            id: queryTodoCurrent?.data?.id
          }
        })
      }, {
        default: () => [queryTodoCurrent?.data?.title]
      })])]), !!queryTodoCurrent?.error && createVNode("div", {
        "role": "alert",
        "class": "alert alert-error"
      }, [createVNode("span", null, [queryTodoCurrent?.error?.message])]), createVNode("form", null, [createVNode("div", {
        "class": "card bg-base-100 shadow-xl"
      }, [createVNode("div", {
        "class": "card-body flex-row"
      }, [withDirectives(createVNode("input", {
        "type": "text",
        "class": "input input-bordered w-full max-w-xs",
        "onUpdate:modelValue": ($event) => this.newTitle = $event
      }, null), [[vModelText, this.newTitle]]), createVNode("button", {
        "class": "btn btn-primary",
        "type": "submit",
        "onClick": withModifiers(() => {
          this.addTodo();
        }, ["prevent"])
      }, [createTextVNode("Create")])])])]), createVNode("div", {
        "class": "overflow-x-auto"
      }, [createVNode("table", {
        "class": "table"
      }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Title")]), createVNode("th", null, [createTextVNode("Done")]), createVNode("th", null, null)])]), createVNode("tbody", null, [queryTodos.data?.map((item) => {
        return createVNode("tr", null, [createVNode("td", null, [createVNode("a", {
          "class": "link link-primary",
          "href": "#",
          "onClick": withModifiers(() => {
            this.currentTodoId = item.id;
          }, ["prevent"])
        }, [item.title])]), createVNode("td", null, [item.done && createVNode("input", {
          "type": "checkbox",
          "checked": true,
          "class": "checkbox checkbox-success"
        }, null)]), createVNode("td", null, [createVNode("button", {
          "class": "btn btn-error btn-sm",
          "onClick": () => {
            this.deleteTodo(item);
          }
        }, [createTextVNode("Delete")]), !item.done && createVNode("button", {
          "class": "btn btn-success btn-sm",
          "onClick": () => {
            this.completeTodo(item);
          }
        }, [createTextVNode("Complete")])])]);
      })])])])]
    });
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$modelTodo", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
let NSControllerPageItem;
(function(_NSControllerPageItem) {
  _NSControllerPageItem.paramsSchema = ControllerPageItemSchemaParams;
  _NSControllerPageItem.querySchema = ControllerPageItemSchemaQuery;
})(NSControllerPageItem || (NSControllerPageItem = {}));
const ZPageItem = createZovaComponentPage(ControllerPageItem, void 0, void 0);
const ZPageTodo = createZovaComponentPage(ControllerPageTodo, void 0, void 0);
const routes = [{
  path: "todo",
  component: ZPageTodo
}, {
  name: "item",
  path: "item/:id",
  component: ZPageItem
}];
var _dec, _dec2, _class;
const pagePathSchemas = {};
const pageNameSchemas = {
  "demo-todo:item": {
    params: NSControllerPageItem.paramsSchema,
    query: NSControllerPageItem.querySchema
  }
};
let ScopeModuleDemoTodo = (_dec = Scope(), _dec2 = BeanInfo({
  module: "demo-todo"
}), _dec(_class = _dec2(_class = class ScopeModuleDemoTodo2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ApiTodo,
  ControllerPageItem,
  ControllerPageItemSchemaParams,
  ControllerPageItemSchemaQuery,
  ControllerPageTodo,
  ModelTodo,
  NSControllerPageItem,
  ScopeModuleDemoTodo,
  ZPageItem,
  ZPageTodo,
  pageNameSchemas,
  pagePathSchemas,
  routes
};
