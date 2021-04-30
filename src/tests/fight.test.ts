import {Pokemon} from "../models/Pokemon";
import {determinefirstAttacker, fightArena} from "../utils/fight";


let carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, life: 44});
//Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
let pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, life: 35});
//Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test determine pokemon first attacker function', function () {

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

describe('Test pokemon fight Arena function',function () {
    let randomMock: (() => number);
    beforeEach(() => {
        randomMock = () => 0.89;
    });
    afterEach(() => {
        // Initial state
        carapuce.speed = 43;
        carapuce.life = 44;
        pikachu.speed = 90;
        pikachu.life = 35;
    });

    it('Should return as winner pikachu when carapuce has no chance',async function () {
        carapuce.life = 1;
        expect(await fightArena(pikachu, carapuce)).toBe(pikachu);
    })

    it('Should return as winner carapuce when pikachu has no chance on long fight',async function () {
        carapuce.life = 1000;
        expect(await fightArena(pikachu, carapuce)).toBe(carapuce);
    })

    it('Should throw error if one of pokemon is dead',async function () {
        carapuce.life = 0;
        await expect(async () => {
            await fightArena(pikachu, carapuce)
        }).rejects.toThrow("One or both pokemon is / are dead so can't fight");
    })

})
