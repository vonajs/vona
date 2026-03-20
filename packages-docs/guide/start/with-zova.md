# Integration with Zova

When creating a Vona project using the `cabloy-basic` template, the latest version of the Zova JS bundle is already included. Therefore, you can directly render CRUD admin pages. We can also create a Zova frontend project and integrate it with the Vona backend to develop a more advanced fullstack system

## 1. Clone the Zova source code

```bash
$ git clone git@github.com:zovajs/zova.git
$ cd zova
```

## 2. Initialize and install dependencies

```bash
$ npm run init
```

## 3. Enter the zova-dev directory

```bash
$ cd zova-dev
```

## 4. Modify the .env file

`env/.env.ssr.cabloyBasicAdmin`:

```bash
BUILD_COPY_RELEASE = /path-to-vona/src/suite/cabloy-basic/modules/basic-siteadmin/assets/site
BUILD_REST_COPY_DIST = /path-to-vona/src/suite/cabloy-basic/modules/basic-siteadmin/zovaRest
```

| Name                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| BUILD_COPY_RELEASE   | Automatically copy the built JS bundle to Vona  |
| BUILD_REST_COPY_DIST | Automatically copy the built type files to Vona |

## 5. Build

- Build JS bundle

```bash
$ npm run build:ssr:cabloyBasicAdmin
```

- Build type files

```bash
$ npm run build:rest:cabloyBasicAdmin
```

## 6. Start the development server

You can directly start the Zova development server to facilitate frontend code debugging

```bash
$ npm run dev:ssr:cabloyBasicAdmin
```
