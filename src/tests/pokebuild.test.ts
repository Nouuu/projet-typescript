import {Pokemon} from "../models/Pokemon";
import {getPokemonFromPokedex} from "../utils/pokebuild";


let pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, life: 35});
let carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, life: 44});

//Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test pokebuild from API', function () {
    describe('When a valid pokemon name is provided', function () {
        it('should return pikachu pokemon with API stats', async function () {
            expect(await getPokemonFromPokedex("pikachu")).toEqual(pikachu);
        });
        it('should return squirtle pokemon with API stats', async function () {
            expect(await getPokemonFromPokedex("squirtle")).toEqual(carapuce);
        });

        it('should return null when empty name', async function () {
            expect(await getPokemonFromPokedex("")).toBeNull();
        });

        it('should return null when unknown name', async function () {
            expect(await getPokemonFromPokedex("unknown")).toBeNull();
        });
    });

})
