# TypeScript from JavaScript

This is a project you can walk through commit-by-commit to see the transformation of JavaScript code to TypeScript.

[@JeremyLikness](https://twitter.com/JeremyLikness)

## Intro

`git checkout d65aed6`

Currently, there is a small JavaScript "app" that you can run with the command:

`node index.js`

There are some defects and if you browse to JavaScript in your IDE, you may or may not get appropriate hints about what's wrong.

## Transform to TypeScript

JavaScript is valid TypeScript (with a few exceptions) so we'll start by setting up TypeScript.

`npm install --save-dev typescript`

Add two build scripts to the `package.json` file for compiling and compiling on a watch:

```javascript
"scripts": {
    "build": "tsc",
    "build:w": "tsc -w"
}
```

To create a configuration file that TypeScript uses to compile source to JavaScript, run:

`./node_modules/typescript/bin/tsc --init`

Finally, rename `index.js` to `index.ts`.

> Ouch! There are a lot of errors. We'll address these in the next commit.