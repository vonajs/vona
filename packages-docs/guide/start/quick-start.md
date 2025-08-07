# Quick Start

## Preparation

1. Install command-line tools

``` bash
$ pnpm add -g tsx@latest
$ pnpm add -g vona-cli@latest
```

2. Install Vscode extension: [Vona - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.vona-vscode)

This extension provides a large number of menus for quickly creating code skeletons for various resources

## Quick Start

1. Create Project

``` bash
$ vona :create:project projectName
$ cd projectName
```

2. Modify .env file

`env/.env`:

``` bash
# database
DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql
DATABASE_CLIENT_PG_PASSWORD =
DATABASE_CLIENT_MYSQL_PASSWORD =

# redis
REDIS_DEFAULT_PASSWORD =
```

::: warning
For development and test environments, it is recommended to use the system default database name so that the system can automatically create a test database
:::

3. Start Dev Server

``` bash
$ npm run dev
```

4. Unit test

``` bash
$ npm run test
```

5. Build

``` bash
$ npm run build
```

## Docker Compose

``` bash
$ npm run build:docker
$ sudo docker-compose build
$ sudo docker-compose up
```
