Frontier
========

**Frontier** is a front-tier frontend libstack. No pun intended.

It's the amalgam of the following cutting-edge frontend technologies, all wired up in a clean, orderly manner:

* [**Babel**](https://github.com/babel/babel): Cutting-edge ECMAScript
* [**React**](https://github.com/facebook/react): Cutting-edge UI Renderer
* [**Webpack**](https://github.com/webpack/webpack): Cutting-edge Frontend Modulizer
* [**ESLint**](https://github.com/eslint/eslint): Cutting-edge ECMAScript Linter
* [**JavaScript Semi-Standard Style**](https://github.com/Flet/semistandard): Cutting-edge ECMAScript Style Enforcer

Simply clone the repo to jump-start your own project with everything in place!

Recommended Environment
-----------------------

The setup instructions below assume you're using the following tools for development:

* OS X
* [Homebrew](http://brew.sh/)
* [Atom](https://atom.io/)

They're not requirements, and you can still use the libstack in your most comfortable environment with some slight modifications to the setup process.

Setup
-----

### Install Node Environment

```bash
# Replace [LATEST_VERSION] with the latest version number
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/[LATEST_VERSION]/install.sh | bash
$ nvm install iojs
$ nvm alias default iojs
```

### Install/Update System Packages

```bash
$ brew install git git-flow-avh
```

### Install Atom Packages

```bash
$ apm install editorconfig linter linter-js-standard
```

### Init the Project

```bash
$ npm run init
```

Blanks
------

| File | Line:Column |
| ---- | ----------- |
| package.json | 2:12 |
|              | 5:19 |
|              | 8:13 |
| source/index.html | 6:12 |
