import {Pokemon} from "../models/Pokemon";
import {determinefirstAttacker} from "../utils/fight";
import {getPokemonFromPokedex} from "../utils/pokebuild";


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
        it('should return Pikachu when Pikachu 90 speed attack Carapuce 43 speed', () => {
            expect(determinefirstAttacker(pikachu, carapuce)).toBe(pikachu);
        });
        it('should return Carapuce when Pikachu 90 speed attack Carapuce 100 speed', () => {
            carapuce.speed = 100;
            expect(determinefirstAttacker(pikachu, carapuce)).toBe(carapuce);
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
        it('Should return pikachu (1st pokemon) when rand > 0.5', function () {
            expect(determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(pikachu)
        });
        it('Should return carapuce (2nd pokemon) when rand <= 0.5', function () {
            randomMock = () => 0.5;
            expect(determinefirstAttacker(pikachu, carapuce, randomMock)).toBe(carapuce)
        });
    })
})

describe('Test pokemon attack other Pokemon', function () {
    let randomMock: (() => number);
    beforeEach(() => {
        randomMock = () => 0.5;
        carapuce.life = 44;
        pikachu.life = 35;
    });

    describe('When pikachu is alive and attack carapuce', function () {

        it('should remove 27.5 pv to carapuce when pikachu attack carapuce with 55 attack', function () {
            pikachu.attackPokemon(carapuce, randomMock);
            expect(carapuce.life).toBe(16.5);
        });

        it('should remove 55 pv to carapuce and KO when pikachu attack carapuce with 55 attack and critic', function () {
            randomMock = () => 1;
            pikachu.attackPokemon(carapuce, randomMock);
            expect(carapuce.life).toBe(0);
        });
    });
    describe('When pikachu attacker is dead and attack carapuce', function () {
        it('should not remove any pv to carapuce because attacker is KO', function () {
            pikachu.life = 0;
            pikachu.attackPokemon(carapuce, randomMock);
            expect(carapuce.life).toBe(44);
        });
    });
})