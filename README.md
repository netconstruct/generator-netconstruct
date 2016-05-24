# generator-netconstruct

## Installation

First, install [Yeoman](http://yeoman.io) and generator-netconstruct using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

Then clone generator-netconstruct and link the directory using [npm](https://www.npmjs.com/).

```bash
git clone https://github.com/netconstruct/generator-netconstruct.git
cd generator-netconstruct
npm link
```

Then generate your new project:

```bash
yo netconstruct
```

## Git Branches

The generator can create the default Git branches for a project, this assumes the repository has already been configured and created on the remote "origin":

```bash
yo netconstruct:git
```

The generator can also create branches from the master for features, hotfixes and releases:

```bash
yo netconstruct:git-feature
yo netconstruct:git-hotfix
yo netconstruct:git-release
```

## Angular JS Generators

The generator can also generate various templated Angular JS files using the following commands:

```bash
yo netconstruct:module
yo netconstruct:controller
yo netconstruct:directive
yo netconstruct:factory
yo netconstruct:filter
yo netconstruct:service
```

## License

 © [NetConstruct](http://www.netconstruct.co.uk)
