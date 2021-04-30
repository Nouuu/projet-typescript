import {Pokemon} from "../models/Pokemon";
import {determinefirstAttacker} from "../utils/fight";


let carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, life: 44});
//Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
let pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, life: 35});
//Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test determine pokemon first attacker', function () {

    /*
        beforeAll(async (done) => {
            const carapucet = await getPokemonFromPokedex("squirtle");
            const pikachut = await getPokemonFromPokedex("pikachu");
            // console.log(carapuce);
            // console.log(pikachu);
            if (!carapucet || !pikachut) {
                fail("Pokemons are null !");
            }
            carapuce = carapucet;
            pikachu = pikachut;
            done();
        });
    */

    describe('When pokemon don\'t have same speed', function () {
        it('should return Pikachu when Pikachu 90 speed attack Carapuce 43 speed', async () => {
            expect(await determinefirstAttacker(pikachu, carapuce)).toBe(pikachu);
        });
        it('should return Carapuce when Pikachu 90 speed attack Carapuce 100 speed', async () => {
            carapuce.speed = 100;
            expect(await determinefirstAttacker(pikachu, carapuce)).toBe(carapuce);
        });
    });
    describe('When pokemon have same speed', function () {
        let randomMock: (() => number);
        beforeEach(() => {
            randomMock = () => 0.89;
            carapuce.speed = 15;
            pikachu.speed = 15;
        });
        afterEach(() => {
            carapuce.speed = 43;
            pikachu.speed = 90;
        });
        it('Should return pikachu (1st pokemon) when rand > 0.5', async function () {
            expect(await determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(pikachu)
        });
        it('Should return carapuce (2nd pokemon) when rand <= 0.5', async function () {
            randomMock = () => 0.5;
            expect(await determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(carapuce)
        });
    })
})
