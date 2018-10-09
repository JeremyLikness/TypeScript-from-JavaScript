"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var delay = function (fn) { return setTimeout(fn, 0); };
var delayDebug = function (str) { return delay(function () { return console.log(str); }); };
delayDebug("\n\nDEBUG INFO:");
var getFnName = function (fn) {
    var funcText = fn.toString();
    var trimmed = funcText.substr('function '.length);
    var name = trimmed.substr(0, trimmed.indexOf('('));
    return name.trim();
};
function logLifecycle(constructor) {
    var newCtor = /** @class */ (function (_super) {
        __extends(newCtor, _super);
        function newCtor() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this, args) || this;
            delay(function () { return console.log("Constructed " + getFnName(constructor) + " at " + new Date()); });
            return constructor.apply(_this, args);
        }
        return newCtor;
    }(constructor));
    newCtor.prototype = constructor.prototype;
    return newCtor;
}
function debug(_target, propertyKey, descriptor) {
    var originalMethod = descriptor.value; // save a reference to the original method
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        delay(function () { return console.info("The method args for " + propertyKey + "() are: " + JSON.stringify(args)); }); // pre
        var result = originalMethod.apply(this, args); // run and store the result
        delay(function () { return console.info("The return value for " + propertyKey + "() is: " + result); }); // post
        return result; // return the result of the original method
    };
    return descriptor;
}
var PrintRecursive = function (parent, children) {
    delayDebug("Printing parent...");
    parent.print();
    if (children) {
        delayDebug("Printing children...");
        var printJobs = children(parent);
        for (var idx = 0; idx < printJobs.length; idx += 1) {
            delayDebug("Printing child at index " + idx);
            PrintRecursive(printJobs[idx]);
        }
    }
};
var firstUpper = function (inp) { return "" + inp.charAt(0).toLocaleUpperCase() + inp.slice(1); };
var printProperty = function (key, contact) {
    var value = contact[key];
    if (typeof value === 'number') {
        console.log(firstUpper(key) + ": " + value.toFixed(0));
    }
    else {
        console.log(firstUpper(key) + ": " + value);
    }
};
var Contact = /** @class */ (function () {
    function Contact(name, age, contactType, contactNumber) {
        this.name = name;
        this.age = age;
        this.contactType = contactType;
        this.contactNumber = contactNumber;
    }
    Contact_1 = Contact;
    Contact.prototype.print = function () {
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
    };
    Contact.calculateYearBorn = function (age) {
        var thisYear = (new Date()).getFullYear();
        return "Born around the year " + (thisYear - age).toFixed(0);
    };
    var Contact_1;
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
    return Contact;
}());
var ContactList = /** @class */ (function () {
    function ContactList() {
        var contacts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            contacts[_i] = arguments[_i];
        }
        this.contacts = contacts;
    }
    ContactList.prototype.print = function () {
        console.log("A rolodex with " + this.contacts.length + " contacts");
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
    return ContactList;
}());
var me = new Contact("Jeremy", 44.1, "mobile", "555-1212");
var myWife = new Contact("Doreen", 30, "home", "404-123-4567");
var rolodex = new ContactList(me, myWife);
console.log("\n\nNormal print:");
PrintRecursive(rolodex);
console.log("\n\nPrint with recursive:");
PrintRecursive(rolodex, function (rolodex) { return rolodex.contacts; });
var find = function (list, test) {
    for (var idx = 0; idx < list.length; idx += 1) {
        if (test(list[idx])) {
            return list[idx];
        }
    }
    return null;
};
var found = find(rolodex.contacts, function (contact) { return contact.name === "Doreen"; });
if (found) {
    console.log("\n\nFound something:");
    found.print();
}
else {
    console.log("\n\nNot found!");
}
