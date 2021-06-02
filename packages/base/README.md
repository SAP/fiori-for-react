# @ui5/webcomponents-react-base
Base Utilities for ui5-webcomponents-react

## Installation
```
npm install @ui5/webcomponents-react-base --save
```

## Usage

This package is a collection of internal utils for the `@ui5/webcomponents-react` project and is not intended to be used
as a standalone library in applications. The only intended public usage is running the codemod cli:

*The codemod cli is exposed starting from `@ui5/webcomponents-react-base@0.16.2`.*

```shell
# if you only have .js and .jsx files in your project
npx ui5wcr-codemod [transformer-name] [file-or-directory-to-run-on]

# if you are using TypeScript (.ts and .tsx)
npx ui5wcr-codemod [transformer-name] [file-or-directory-to-run-on] --typescript
```

### Available Transformers

#### `transformLibToDist`
`@ui5/webcomponents-react@0.15.0` changed all import paths from `/lib` to `/dist`. You can migrate your codebase (e.g. your `src` folder) by running:
```shell
npx ui5wcr-codemod transformLibToDist src
# add --typescript if you are using TypeScript
```

#### `renamePropsV17`
`@ui5/webcomponents-react@0.17.0` renamed lots of props in order to have a more consistent API. You can migrate your codebase (e.g. your `src` folder) by running:
```shell
npx ui5wcr-codemod renamePropsV17 src
# add --typescript if you are using TypeScript
```


## Contribute
Please check our [Contribution Guidelines](https://github.com/SAP/ui5-webcomponents-react/blob/master/CONTRIBUTING.md).

## License
Please see our [LICENSE](https://github.com/SAP/ui5-webcomponents-react/blob/main/LICENSE) for copyright and license information. 
Detailed information including third-party components and their licensing/copyright information is available via the [REUSE tool](https://api.reuse.software/info/github.com/SAP/ui5-webcomponents-react).
