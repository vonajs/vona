# 依赖查找

除了`依赖注入`，Vona 还提供了`依赖查找`。在 Vona 中，推荐使用依赖查找，因为依赖查找可以让代码更加简洁、直观

## 本模块查找

假设我们要在模块 home-base 的 ControllerMenu 中查找本模块提供的 ServiceMenu，代码如下：

``` typescript
class ControllerMenu {
  async test() {
    return await this.scope.service.menu.retrieveMenus('');
  }
}  
```

- 通过`this.scope`获取本模块的 scope 对象，从而找到本模块提供的 service

## 跨模块查找

假设我们要在模块 home-index 的 ControllerHome 中查找模块 home-base 提供的 ServiceMenu，代码如下：

``` typescript
class ControllerHome {
  async test() {
    return await this.$scope.homeBase.service.menu.retrieveMenus('');
  }
}  
```

- 通过`this.$scope.homeBase`获取模块 home-base 的 scope 对象，从而找到模块 home-base 提供的 service

## 查找全局service bean

假设我们要在模块 home-index 的 ControllerHome 中查找模块 a-jwt 提供的全局 service bean `BeanJwt`，代码如下：

``` typescript
class ControllerHome {
  async test() {
    return await this.bean.jwt.create({});
  }
}  
```

- 通过`this.bean`获取 app bean 容器，从而找到全局 service bean
