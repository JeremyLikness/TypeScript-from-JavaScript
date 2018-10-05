function delay(fn) {
    setTimeout(fn, 0);
}
delay(function () {
    console.log("\n\nDEBUG INFO:");
});
function Contact(name, age, contactType, phoneNumber) {
    this.name = name;
    this.age = age;
    this.contactType = contactType;
    this.phoneNumber = phoneNumber;
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
function ContactList() {
    var contacts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        contacts[_i] = arguments[_i];
    }
    this.contacts = contacts;
}
ContactList.prototype.print = function () {
    delay(function () {
        console.log("About to print ...");
    });
    for (var idx = 0; idx < this.contacts.length; idx += 1) {
        delay(function () {
            console.log("Printing contact " + idx);
        });
        this.contacts[idx].print();
    }
};
var me = new Contact("Jeremy", 44.1, "Mobile", "555-1212");
var myWife = new Contact("Doreen", 30, "Home", "404-123-4567");
var rolodex = new ContactList(me, myWife);
rolodex.print();
