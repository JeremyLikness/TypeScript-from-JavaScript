var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Contact_1;
"use strict";
const delay = (fn) => setTimeout(fn, 0);
const delayDebug = (str) => delay(() => console.log(str));
delayDebug("\n\nDEBUG INFO:");
const getFnName = (fn) => {
    let funcText = fn.toString();
    let trimmed = funcText.substr('function '.length);
    let name = trimmed.substr(0, trimmed.indexOf('('));
    return name.trim();
};
function logLifecycle(constructor) {
    let _new = new Proxy(constructor, {
        apply(target, _thisArg, argumentsList) {
            delay(() => console.log(`Constructed ${getFnName(constructor)} at ${new Date()}`));
            return new target(...argumentsList);
        }
    });
    return _new;
}
function debug(_target, propertyKey, descriptor) {
    let originalMethod = descriptor.value; // save a reference to the original method
    descriptor.value = function (...args) {
        delay(() => console.info(`The method args for ${propertyKey}() are: ${JSON.stringify(args)}`)); // pre
        var result = originalMethod.apply(this, args); // run and store the result
        delay(() => console.info(`The return value for ${propertyKey}() is: ${result}`)); // post
        return result; // return the result of the original method
    };
    return descriptor;
}
const PrintRecursive = (parent, children) => {
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
};
const firstUpper = (inp) => `${inp.charAt(0).toLocaleUpperCase()}${inp.slice(1)}`;
const printProperty = (key, contact) => {
    let value = contact[key];
    if (typeof value === 'number') {
        console.log(`${firstUpper(key)}: ${value.toFixed(0)}`);
    }
    else {
        console.log(`${firstUpper(key)}: ${value}`);
    }
};
let Contact = Contact_1 = class Contact {
    constructor(name, age, contactType, contactNumber) {
        this.name = name;
        this.age = age;
        this.contactType = contactType;
        this.contactNumber = contactNumber;
    }
    print() {
        printProperty("name", this);
        printProperty("age", this);
        console.log(Contact_1.calculateYearBorn(this.age));
        if (this.contactType === "mobile") {
            console.log("Cell phone:");
        }
        else {
            console.log("Landline:");
        }
        printProperty("contactNumber", this);
    }
    static calculateYearBorn(age) {
        let thisYear = (new Date()).getFullYear();
        return `Born around the year ${(thisYear - age).toFixed(0)}`;
    }
};
__decorate([
    debug,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Contact.prototype, "print", null);
__decorate([
    debug,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], Contact, "calculateYearBorn", null);
Contact = Contact_1 = __decorate([
    logLifecycle,
    __metadata("design:paramtypes", [String, Number, String, String])
], Contact);
let ContactList = class ContactList {
    constructor(...contacts) {
        this.contacts = contacts;
    }
    print() {
        console.log(`A rolodex with ${this.contacts.length} contacts`);
    }
};
__decorate([
    debug,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactList.prototype, "print", null);
ContactList = __decorate([
    logLifecycle,
    __metadata("design:paramtypes", [Contact])
], ContactList);
const me = new Contact("Jeremy", 44.1, "mobile", "555-1212");
const myWife = new Contact("Doreen", 30, "home", "404-123-4567");
const rolodex = new ContactList(me, myWife);
console.log("\n\nNormal print:");
PrintRecursive(rolodex);
console.log("\n\nPrint with recursive:");
PrintRecursive(rolodex, rolodex => rolodex.contacts);
const find = (list, test) => {
    for (let idx = 0; idx < list.length; idx += 1) {
        if (test(list[idx])) {
            return list[idx];
        }
    }
    return null;
};
const found = find(rolodex.contacts, contact => contact.name === "Doreen");
if (found) {
    console.log("\n\nFound something:");
    found.print();
}
else {
    console.log("\n\nNot found!");
}
