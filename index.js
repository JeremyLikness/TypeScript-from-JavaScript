var delay = function (fn) { return setTimeout(fn, 0); };
delay(function () { return console.log("\n\nDEBUG INFO:"); });
var Contact = /** @class */ (function () {
    function Contact(name, age, contactType, contactNumber) {
        this.name = name;
        this.age = age;
        this.contactType = contactType;
        this.contactNumber = contactNumber;
    }
    Contact.prototype.print = function () {
        console.log(this.name);
        console.log(this.age);
        if (this.contactType === "mobile") {
            console.log("Cell phone:");
        }
        else {
            console.log("Landline:");
        }
        console.log(this.contactNumber);
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
        delay(function () { return console.log("About to print ..."); });
        var _loop_1 = function (idx) {
            delay(function () {
                console.log("Printing contact " + idx);
            });
            this_1.contacts[idx].print();
        };
        var this_1 = this;
        for (var idx = 0; idx < this.contacts.length; idx += 1) {
            _loop_1(idx);
        }
    };
    return ContactList;
}());
var me = new Contact("Jeremy", 44.1, "mobile", "555-1212");
var myWife = new Contact("Doreen", 30, "home", "404-123-4567");
var rolodex = new ContactList(me, myWife);
rolodex.print();
var find = function (list, test) {
    for (var idx = 0; idx < list.length; idx += 1) {
        if (test(list[idx])) {
            return list[idx];
        }
    }
    return null;
};
var found = find(rolodex, function (contact) { return contact.Name === "Doreen"; });
if (found) {
    console.log("\n\nFound something:");
    found.print();
}
else {
    console.log("\n\nNot found!");
}
