export class Person {
    constructor(...args) {
        args.forEach(({ name, value }) => (this[name] = value));
    }
}
