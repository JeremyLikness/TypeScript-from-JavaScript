const delay = fn => setTimeout(fn, 0);
const delayDebug = str => delay(() => console.log(str)); 

delayDebug("\n\nDEBUG INFO:");

type Phone = 'home' | 'mobile';

interface ICanPrint {
    print(): void;
}

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

interface IAmContact {
    name: string;
    age: number;
    contactType: Phone;
    contactNumber: string;
}

const firstUpper = (inp: string) => `${inp.charAt(0).toLocaleUpperCase()}${inp.slice(1)}`;

const printProperty = (key, contact: IAmContact) => {
    console.log(`${firstUpper(key)}: ${contact[key]}`);
}

class Contact implements IAmContact, ICanPrint {
    constructor(
        public name: string, 
        public age: number, 
        public contactType: Phone, 
        public contactNumber: string) {}

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
}

interface IAmContactList {
    contacts: Contact[];
}

class ContactList implements IAmContactList, ICanPrint {
    contacts: Contact[];
    constructor(...contacts: Contact[]) {
        this.contacts = contacts;
    }
    print () {
        console.log(`A rolodex with ${this.contacts.length} contacts`);
    }
}

const me = new Contact("Jeremy", 44.1, "mobile", "555-1212");
const myWife = new Contact("Doreen", 30, "home", "404-123-4567");
const rolodex = new ContactList(me, myWife);

console.log("\n\nNormal print:");
PrintRecursive(rolodex);

console.log("\n\nPrint with recursive:");
PrintRecursive(rolodex, rolodex => rolodex.contacts);

type Predicate<T> = (item: T) => boolean;

const find = <T>(list: T[], test: Predicate<T>) => {
    for (let idx = 0; idx < list.length; idx += 1) {
        if (test(list[idx])) {
            return list[idx];
        }
    }
    return null;
}

const found = find(rolodex.contacts, contact => contact.name === "Doreen");

if (found) {
    console.log("\n\nFound something:");
    found.print();
}
else {
    console.log("\n\nNot found!");
}

