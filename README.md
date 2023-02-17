# yarn-berry-pnp-monorepo

Yarn Berry Monorepo with P'n'P mode (1 NestJS app, 1 Vite & React.js app, 1 shared library)

## Usage Requirements

- Node.js > 16 version
- Yarn (Explanation: https://yarnpkg.com/getting-started/install)

## Explanation

This monorepo is a simple example of how to use Yarn Berry with P'n'P mode in a monorepo.

This is a monorepo with 3 packages:

- `@packages/nest`: A NestJS Node.js server app
- `@packages/web`: A Vite & React.js app for web browsers
- `@packages/shared-data`: A shared library

and, this monorepo is configured to use Yarn Berry with P'n'P mode. It means that all dependencies are installed in the `.yarn/cache` directory and all dependencies are linked to each other using P'n'P mode.

`nest` app is just a simple NestJS app. It uses default NestJS template and it compiles to a CommonJS JavaScript files.

`web` app is a Vite & React.js app. It uses default Vite's 'React.js + TypeScript' template.

`shared-data` is a shared library for this monorepo. It's used by `nest` and `web` apps. It written to support both Node.js and browser environments.

`shared-data` is a TypeScript library and it need to be compiled to JavaScript. It's compiled to 2 different formats: CommonJS and ES Modules. It's compiled to `dist/cjs` and `dist/esm` directories respectively. (If you don't compile it first, you will get an error when you try to run `nest` or `web` apps for not finding `shared-data` module.)

### Detailed explanation of `package.json` of `@packages/shared-data`

Let's have a look at the `package.json` of `@packages/shared-data`.

```json
{
  "name": "@packages/shared-data",
  "private": true,

  "types": "src/index.ts",
  "main": "src/index.ts",

  "exports": {
    ".": {
      "import": {
        "types": "./dist/esm/src/index.d.ts",
        "default": "./dist/esm/src/index.js"
      },
      "require": {
        "types": "./dist/cjs/src/index.d.ts",
        "default": "./dist/cjs/src/index.js"
      }
    }
  },

  "scripts": {
    "build:cjs": "tsc -b -v tsconfig.cjs.json",
    "build:esm": "tsc -b -v tsconfig.esm.json",
    "build": "yarn run build:cjs & yarn run build:esm",
    "watch": "yarn run build:cjs --watch & yarn run build:esm --watch"
  },

  "dependencies": {
    "date-fns": "^2.29.3"
  },
  "devDependencies": {
    "typescript": "^4.9.4"
  }
}
```

- `name` property represents the name of this package.

- `private` property is set to `true` because this package is not published to npm registry.

- `types` and `main` properties are used by TypeScript Language Server to find the type definitions and source code of this package.

- `exports` property is used by Node.js to find the entry point of this package. It's used by `nest` and `web` apps to import this package.

  `nest` app compiles to a CommonJS app, it uses `require` to import this package. And `web` app needs to import package as an ES Module, Because it's a Vite app and [ES Module is required for better bundling results](https://web.dev/commonjs-larger-bundles/).

  So, we need to compile this package to 2 different formats: CommonJS and ES Modules. And we need to tell Node.js to use `dist/cjs` directory when it's imported by `require` and use `dist/esm` directory when it's imported by `import`. We can do this by using `exports` property with `require` and `import` conditions. and it's called Conditional Exports.

  More detailed explanation of `exports` property: https://nodejs.org/api/packages.html#exports (covers basic information of `exports` field) and https://nodejs.org/api/packages.html#conditional-exports (covers conditional exports feature)

- `scripts` property contains 4 scripts:

  - `build:cjs`: It compiles the TypeScript files to CommonJS format.
  - `build:esm`: It compiles the TypeScript files to ES Modules format.
  - `build`: It runs `build:cjs` and `build:esm` scripts in parallel.
  - `watch`: It runs `build:cjs` and `build:esm` scripts in parallel and watch for changes.

- `dependencies` and `devDependencies` property are used by Yarn Berry to install dependencies.

**Most important part of this `package.json` is `exports`, `types` & `main` and `scripts` properties.** These properties define how this package is compiled and how it's imported by other packages.

You may ask isn't `types` and `main` properties need to point to compiled files. Since we are using Node.js >= 16, we can use `exports` property to tell Node.js to use compiled files, and `types` and `main` properties can point to the source files to be used by TypeScript Language Server. [`types` and `main` properties just ignored by Node.js when `exports` property is defined](https://github.com/microsoft/TypeScript/issues/46334#issuecomment-1202985706)

## Workflow

1. Build the `shared-data` package first
2. Then build and run other packages that depend on `shared-data` package
