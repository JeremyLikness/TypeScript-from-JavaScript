var delay = function (fn) { return setTimeout(fn, 0); };
var delayDebug = function (str) { return delay(function () { return console.log(str); }); };
delayDebug("\n\nDEBUG INFO:");
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
    console.log(firstUpper(key) + ": " + contact[key]);
};
var Contact = /** @class */ (function () {
    function Contact(name, age, contactType, contactNumber) {
        this.name = name;
        this.age = age;
        this.contactType = contactType;
        this.contactNumber = contactNumber;
    }
    Contact.prototype.print = function () {
        printProperty("name", this);
        printProperty("age", this);
        if (this.contactType === "mobile") {
            console.log("Cell phone:");
        }
        else {
            console.log("Landline:");
        }
        printProperty("contactNumber", this);
    };
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
