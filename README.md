# TypeScript from JavaScript

This is a project you can walk through commit-by-commit to see the transformation of JavaScript code to TypeScript.

[@JeremyLikness](https://twitter.com/JeremyLikness)

Background notes:

* 1995: Mocha becomes LiveScript, written in 10 days
* 1996: JavaScript lives!
* 1997: ECMAScript 1 sets standards
* 1999: ECMAScript 3
* 2005: jQuery "Normalize the DOM"
* 2009: Node.js, ECMAScript 5
* 2012: TypeScript (and there was much rejoicing)
* 2015: ECMAScript 2015 ("Harmony")

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

`git checkout b3974e5`

The first bug is a naming issue. The class defines a property called `phoneNumber` but the print method references `contactNumber`. Change the property to `contactNumber` to be consistent with `contactType`.

Next, create a type called `Phone` that allows a value of either `mobile` or `home`. Change the `contactType` to be of type `Phone` and fix several more defects. Now when you compile and run it should print as expected, except for the debug information.

## Lambdas, let, and string interpolation

`git checkout 3be05fe`

Lambda expressions help by automatically preserving the reference to `this` and pass it to subsequent nested expressions so there are not unexpected side effects. The `let` keyword indicates a variable is indeed local, and TypeScript will generate additional code for it to behave properly in closure situations to preserve the intended scope. Finally, string interpolation makes it easier to read concatenated strings in the source. It is leveraged as a native feature in modern JavaScript and turned back to "string addition" for older JavaScript.

*** (Add a reference to `this.contacts` for more insight into the lambdas).

## Find

`git checkout 788d493`

Add a "find" function to search the contacts and return an example. The initial implementation fails to find anything. Paste this code, compile and run it:

```javascript
const find = (list, test) => {
    for (let idx = 0; idx < list.length; idx += 1) {
        if (test(list[idx])) {
            return list[idx];
        }
    }
    return null;
}

const found = find(rolodex, contact => contact.Name === "Doreen");

if (found) {
    console.log("\n\nFound something:");
    found.print();
}
else {
    console.log("\n\nNot found!");
}
```

## The Power of Generics

`git checkout 14769c5`

Generics help by creating a template for a type, then providing hints and type-checking for that type. To see this in action, refactor the `find` function to use generics. Immediately a bug is revealed.

```TypeScript
const find = <T>(list: T[], test: (item: T) => boolean) => {
    for (let idx = 0; idx < list.length; idx += 1) {
        if (test(list[idx])) {
            return list[idx];
        }
    }
    return null;
}
```

## Fix it

`git checkout b1aae76`

The generic function revealed another defect. Fixing that reveals yet another bug that can be fixed. Compile and run and the search should work.

## Simplify it

`git checkout 9ceda1c`

Create a type called "predicate" to simplify the definition of find. Note this doesn't change the compiled JavaScript at all.

## Interfaces and optional parameters

`git checkout c27d282`

Interfaces help describe types. Refactor to use interfaces. Add a `PrintRecursive` helper function with an optional parameter. Also make debugging easier with a delayDebug function.

```TypeScript
const PrintRecursive = <T extends ICanPrint>(parent: T, children?: (parent: T) => ICanPrint[]) => {
    delayDebug("Printing parent...");
    parent.print();
    if (children) {
        delayDebug("Printing children...");
        const printJobs = children(parent);
        for (let idx = 0; idx < printJobs.length; idx += 1) {
            delayDebug(`Printing child at index ${idx}`);
            PrintRecursive(printJobs[idx]);
        }
    }
}
```

## Formatting

`git checkout 7861a91`

Add a simple function to help with printing contact info so it can print in label: value fashion.

```TypeScript
const firstUpper = (inp: string) => `${inp.charAt(0).toLocaleUpperCase()}${inp.slice(1)}`;

const printProperty = (key, contact: IAmContact) => {
    console.log(`${firstUpper(key)}: ${contact[key]}`);
}

// on contact class print() function

print() {
    printProperty("Name", this);
    printProperty("age", this);
    if (this.contactType === "mobile") {
        console.log("Cell phone:");
    }
    else {
        console.log("Landline:");
    }
    printProperty("contactNumber", this);
}
```

A bug was purposefully introduced: name shows `undefined`. The next iteration will catch and fix that.

## Key types

`git checkout df156fc`

Create a type named `ContactProperty` that uses `keyof` to fix the `printProperty` function. The defect is immediately apparent and can be fixed.

## Type guards

`git checkout 733725b`

Type guards allow IntelliSense to operate on a code block based on logic that enforces a type within the block. Update the `printProperty` function to check for a numeric type and print it fixed (without the decimal).

## Bonus: Strict typing and decorators

`git checkout df156fc`

Decorators make it easier to write a behavior once and apply it multiple times. The following code blocks include a helper method to grab the name of a function, a decorate for a constructor, and a decorator to "debug" a method call. Apply them liberally to classes and methods to see the results. Just place `@logLifeCycle` on a class definition or `@debug` before a method definition. The support for experimental decorators and metadata must be set to `true` in `tsconfig.json`.

A static method is added to calculate approximate year born and called from the `print` method to demonstrate interception of arguments and return values.

Turn on strict typing and refactor a few methods that don't have explicit types.

```TypeScript
const getFnName = (fn: Function) => {
    let funcText = fn.toString();
    let trimmed = funcText.substr('function '.length);
    let name = trimmed.substr(0, trimmed.indexOf('('));
    return name.trim();
};

function logLifecycle<T extends {new(...args:any[]):{}}>(constructor:T) {
    class newCtor extends constructor {
        constructor(...args: any[]) {
            super(args);
            delay(() => console.log(`Constructed ${getFnName(constructor)} at ${new Date()}`));
            return constructor.apply(this, args);
        }
    }
    newCtor.prototype = constructor.prototype;
    return newCtor;
}

function debug(_target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let originalMethod = descriptor.value; // save a reference to the original method
    descriptor.value = function (...args: any[]) {
        delay(() => console.info(`The method args for ${propertyKey}() are: ${JSON.stringify(args)}`)); // pre
        var result = originalMethod.apply(this, args);               // run and store the result
        delay(() => console.info(`The return value for ${propertyKey}() is: ${result}`));               // post
        return result;                                               // return the result of the original method
    };
    return descriptor;
}
```

## PostScript

This version illustrates output using a more modern JavaScript version. The target was changed in `tsconfig.json` to `es2018`. Note that the constructor decorate had to also be modified to use the new `Proxy` object.
