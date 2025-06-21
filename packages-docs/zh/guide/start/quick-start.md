# 快速上手

::: tip
周一至周五`晚8:30`，直播撰写文档，欢迎围观：[B站: 濮水代码](https://space.bilibili.com/454737998)
:::

## 准备工作

1. 安装命令行工具

``` bash
$ pnpm add -g tsx@latest
$ pnpm add -g vona-cli@latest
```

2. 安装 Vscode 插件：[Vona - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.vona-vscode)

该插件提供了大量菜单，用于快速创建各类资源的代码骨架

## 快速开始

1. 创建项目

``` bash
$ vona :create:project projectName
$ cd projectName
```

2. 修改.env 文件

`env/.env`:

``` bash
# database
DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql
DATABASE_CLIENT_PG_PASSWORD =
DATABASE_CLIENT_MYSQL_PASSWORD =

# redis
REDIS_DEFAULT_PASSWORD =
```

3. 启动开发服务

``` bash
$ npm run dev
```

4. 单元测试

``` bash
$ npm run test
```

5. 构建

``` bash
$ npm run build
```

## Docker Compose

``` bash
$ npm run build:docker
$ sudo docker-compose build
$ sudo docker-compose up
```
