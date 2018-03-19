# generator-netconstruct

## Dependencies

To use this generator you must have the [Yeoman](http://yeoman.io) CLI installed.

```bash
# NPM
npm install -g yo

# Yarn
yarn global add yo
```

## Installation

The generator can be installed from our private registry or by creating a symlink [see Development](#development).

```bash
# NPM
npm install -g @netc/generator-netconstruct

# Yarn
yarn global add @netc/generator-netconstruct
```

Then use the generator by running it as normal:

```bash
yo netconstruct
```

## Development

To test the generator during development you will need to "install" the package using a symlink.

First, clone this repository and link the directory using [npm](https://www.npmjs.com/).

```bash
git clone https://github.com/netconstruct/generator-netconstruct.git
cd generator-netconstruct
npm link
```

Then test the generator by running it as normal:

```bash
yo netconstruct
```

## License

 © [NetConstruct](http://www.netconstruct.co.uk)
