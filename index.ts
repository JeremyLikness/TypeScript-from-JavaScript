const delay = fn => setTimeout(fn, 0); 

delay(() => console.log("\n\nDEBUG INFO:"));

type Phone = 'home' | 'mobile';

class Contact {
    constructor(
        public name: string, 
        public age: number, 
        public contactType: Phone, 
        public contactNumber: string) {}

    print() {
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
}

class ContactList {
    contacts: Contact[];
    constructor(...contacts: Contact[]) {
        this.contacts = contacts;
    }
    print () {
        delay(() => console.log("About to print ..."));
        for (let idx = 0; idx < this.contacts.length; idx += 1) {
            delay(() => {
                console.log(`Printing contact ${idx}`);
            });
            this.contacts[idx].print();
        }
    }
}

const me = new Contact("Jeremy", 44.1, "mobile", "555-1212");
const myWife = new Contact("Doreen", 30, "home", "404-123-4567");
const rolodex = new ContactList(me, myWife);
rolodex.print();

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

