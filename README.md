# Commenterize

<p align="center">
  <a href="https://travis-ci.org/schempy/commenterize">
    <img alt="Travis" src="https://img.shields.io/travis/schempy/platelunch/master.svg?style=flat-square">
  </a>
  <a href="https://codecov.io/gh/schempy/commenterize">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/schempy/platelunch.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/commenterize">
    <img alt="npm version" src="https://img.shields.io/npm/v/platelunch.svg?style=flat-square">
  </a>
  <a href="#badge">
    <img alt="code style: commenterize" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>  
</p>

<p align="center">
	<img src="./.assets/logo.png" height="200" width="200" alt="Commenterize logo"/>
</p>

## Intro
Commenterize generates [jsdoc](https://github.com/jsdoc3/jsdoc) style comments for javascript functions and class methods.

## Install
```js
npm install --save-dev commenterzie

--- or globally

npm install -g commenterzie
```

## CLI
```js
commenterize [filename ...]
```

Using glob to find files.
```js
commenterize "src/**/*.js"
```

Only one file will have comments generated.
```js
commenterize "src/my-file.js"
```

## Examples
- [`function declaration`](#function_declaration)
- [`function expression`](#function_expression)
- [`arrow function expression`](#arrow_function_expression)
- [`class method (ES2015)`](#class_method)

### <a id="function_declaration"></a> function declaration
#### Source File
```js
function add(num1, num2) {
  return num1 + num2;
}

module.exports = {
  add: add
};
```

#### Generated file
```js
/**
 * add
 * @param {} num1
 * @param {} num2
 * returns {}
 */
function add(num1, num2) {
  return num1 + num2;
}

module.exports = {
  add: add
};
```

### <a id="function_expression"></a> function expression
#### Source File
```js
const add = function(num1, num2) {
  return num1 + num2;
}

module.exports = {
  add: add
};
```

#### Generated file
```js
/**
 * add
 * @param {} num1
 * @param {} num2
 * returns {}
 */
const add = function(num1, num2) {
  return num1 + num2;
}

module.exports = {
  add: add
};
```

### <a id="arrow_function_expression"></a> arrow function expression
#### Source File
```js
const add = (num1, num2) => {
  return num1 + num2;
}

module.exports = {
  add: add
};
```

#### Generated file
```js
/**
 * add
 * @param {} num1
 * @param {} num2
 * returns {}
 */
const add = (num1, num2) => {
  return num1 + num2;
}

module.exports = {
  add: add
};
```

### <a id="class_method"></a> class method (ES2015)
#### Source File
```js
export class TestClass {
  add(num1, num2) {
    return num1 + num2;
  }
};
```

#### Generated file
```js
export class TestClass {
  /**
   * add
   * @param {} num1
   * @param {} num2
   * @returns
   */
  add(num1, num2) {
    return num1 + num2;
  }
};
```

## Licensing

The code in this project is licensed under MIT license.
