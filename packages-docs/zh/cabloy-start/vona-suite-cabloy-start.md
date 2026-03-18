# vona-suite-cabloy-start

该套件包含两个模块：

|名称|说明|
|--|--|
|start-siteadmin|用于实现`Admin中后台`|
|start-siteweb|用于实现`Web网站`|

## start-siteadmin

该模块包含如下组件：

### 1. SsrSite: Admin

``` typescript
@SsrSite({
  publicPath: 'admin',
  bundlePath: 'ssr-cabloyStartAdmin-5.0.0',
})
export class SsrSiteAdmin {}
```

|名称|说明|
|--|--|
|publicPath|指定网站URL的publicPath|
|bundlePath|指定JS Bundle的路径。由Zova前端项目构建后拷贝至此|




