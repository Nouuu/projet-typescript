export class Pokemon {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    printName() {
        console.log(this.name);
    }
}