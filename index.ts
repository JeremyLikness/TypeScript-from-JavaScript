const delay = (fn: Function) => setTimeout(fn, 0);
const delayDebug = (str: string) => delay(() => console.log(str)); 

delayDebug("\n\nDEBUG INFO:");

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

type ContactProperty = keyof IAmContact;

const printProperty = (key: ContactProperty, contact: IAmContact) => {
    let value = contact[key];
    if (typeof value === 'number') {
        console.log(`${firstUpper(key)}: ${value.toFixed(0)}`);
    }
    else {
        console.log(`${firstUpper(key)}: ${value}`);
    }
}

@logLifecycle
class Contact implements IAmContact, ICanPrint {
    constructor(
        public name: string, 
        public age: number, 
        public contactType: Phone, 
        public contactNumber: string) {}

    @debug
    print() {
        printProperty("name", this);
        printProperty("age", this);
        console.log(Contact.calculateYearBorn(this.age));
        if (this.contactType === "mobile") {
            console.log("Cell phone:");
        }
        else {
            console.log("Landline:");
        }
        printProperty("contactNumber", this);
    }
    @debug
    public static calculateYearBorn(age: number): string {
        let thisYear = (new Date()).getFullYear();
        return `Born around the year ${(thisYear - age).toFixed(0)}`;
    }
}

interface IAmContactList {
    contacts: Contact[];
}

@logLifecycle
class ContactList implements IAmContactList, ICanPrint {
    contacts: Contact[];
    constructor(...contacts: Contact[]) {
        this.contacts = contacts;
    }
    @debug
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

