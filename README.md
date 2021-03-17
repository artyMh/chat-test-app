# Technical test

## How to launch

* Server `cd server && npm install && npm run start:dev`
* Client `cd client && npm install && npm run start`

## About

Everything made from scratch, without any help of starter packs or else (no `create-react-app`, `redux-toolkit`, etc).

## Room to grow

* ~~Re-write server on TypeScript~~
* ~~Use linters~~
* ~~Use `prop-types` package at client~~
* ~~Add i18n module support~~
* ~~Add basic error boundary~~
* ~~Websocket handling logic to redux middleware~~
* ~~Rework project structure~~
* ~~Introduce features/modules folder(notifications list, chat window)~~
* ~~Rework pages~~
* ~~Get rid off decorators~~
* ~~Get rid off `prop-types`~~
* ~~Update packages and node~~
* Rewrite frontend on TypeScript(and use `eslint`)
* Use bootstrap or antd or fluentui
* Add unit tests
* Transfer all chat logic to server(fe sending/receiving partial data, same to be)
* Check all script work at different OSs
* Add server handling exceptions and closing conneciton gracefully
* Add proper validation, anti-spam logic
* Add using cfg where needed
* Localization translates to assets?
* Add path guards by HOCs?
* Add Webpack bundle analyzer ?
* Add prettier ?
* Add husky ?
* Add yarn support ?

## Known issues
* `bundle-analyze` script will fail if `dist` frolder will not present at project directory