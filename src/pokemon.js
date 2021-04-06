function Pokemon(name) {
    this.name = name;
    this.printName = function () {
        console.log(this.name);
    };
}

const carapuce = new Pokemon("Carapuce");
const pikachu = new Pokemon("Pikachu");

carapuce.printName();
pikachu.printName();