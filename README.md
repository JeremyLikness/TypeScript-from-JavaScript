# TypeScript from JavaScript

This is a project you can walk through commit-by-commit to see the transformation of JavaScript code to TypeScript.

[@JeremyLikness](https://twitter.com/JeremyLikness)

## Intro

`git checkout d65aed6`

Currently, there is a small JavaScript "app" that you can run with the command:

`node index.js`

There are some defects and if you browse to JavaScript in your IDE, you may or may not get appropriate hints about what's wrong.

## Transform to TypeScript

`git checkout 08f09e3`

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

## Turn Off Strict Typing and Add a Spread Operator

`git checkout 1b9c8b1`

It's been said all valid JavaScript is valid TypeScript. That is only partly true. TypeScript enables configuration options and by default expects "strict typing" without implicitly allowing a variable to be any type. For now, turn off strict typing by setting it to false in the `tsconfig.json`:

```javascript
{ strict: "false" }
```

Next, you will find our first bug. `ContactList` is expecting an array but what's passed is technically two parameters. You *could* change the constructor call to pass an array like this:

```javascript
new ContactList([me, myWife])
```

A more flexible solution is to accept 1-to-many items passed in by using the spread operator. Change the function declaration for the `ContactList` to this:

```javascript
function ContactList(...contacts) {
```

Now compile and run the code.

```bash
npm run-script build
node index.js
```

That's better. There are still some bugs though. The contact type is printing as landline for both contacts, the phone number isn't showing, and the debug information prints "2" each time.

Before this is addressed, take a look at the compiled `index.js`. Compare to the source TypeScript. Notice it's only slightly different. Although modern JavaScript supports the the "spread operator", it's not supported in the older JavaScript version so TypeScript builds code to make it compatible for you! Later on you'll see the modern version of the compiled JavaScript. For now, let's refactor our function constructors to "real" classes.

## Refactor to "real" classes

`git checkout c39795a`

TypeScript supports a class definition. For older JavaScript, it will generate the appropriate code to "wrap" the class behavior. For newer JavaScript it will generate the native class keyword. The `Contact` and `ContactList` entities are refactored to a class. The constructor is the same as the original function call, with the difference that the parameters are declared `public` and given types. This implicitly creates the properties on the class and moves the constructor parameters to the properties. The generated JavaScript isn't available yet, because a bug has already been identified.

## Fix Two Bugs

The first bug is a naming issue. The class defines a property called `phoneNumber` but the print method references `contactNumber`. Change the property to `contactNumber` to be consistent with `contactType`.

Next, create a type called `Phone` that allows a value of either `mobile` or `home`. Change the `contactType` to be of type `Phone` and fix several more defects. Now when you compile and run it should print as expected, except for the debug information.