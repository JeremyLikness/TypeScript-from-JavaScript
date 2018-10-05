function delay(fn) {
    setTimeout(fn, 0);
}

delay(function() {
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
}

function ContactList(...contacts) {
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
}

const me = new Contact("Jeremy", 44.1, "Mobile", "555-1212");
const myWife = new Contact("Doreen", 30, "Home", "404-123-4567");
const rolodex = new ContactList(me, myWife);
rolodex.print();