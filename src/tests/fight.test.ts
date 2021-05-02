import {Pokemon} from "../models/Pokemon";
import {determinefirstAttacker, fightArena, isAnyPokemonDead, startAttackInterval} from "../utils/fight";


let carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, life: 44});
//Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
let pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, life: 35});
//Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test determine pokemon first attacker function', function () {

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

describe('Test pokemon fight Arena function', function () {
    const mockIntervalMS = 10;

    afterEach(() => {
        // Initial state
        carapuce.speed = 43;
        carapuce.life = 44;
        pikachu.speed = 90;
        pikachu.life = 35;
    });

    it('Should return as winner pikachu when carapuce has no chance', async function () {
        carapuce.life = 1;
        expect(await fightArena(pikachu, carapuce, mockIntervalMS)).toBe(pikachu);
    })

    it('Should return as winner carapuce when pikachu has no chance on long fight', async function () {
        carapuce.life = 1000;
        expect(await fightArena(pikachu, carapuce, mockIntervalMS, false)).toBe(carapuce);
    })

    it('Should throw error if one of pokemon is dead', async function () {
        carapuce.life = 0;
        await expect(async () => {
            await fightArena(pikachu, carapuce)
        }).rejects.toThrow("One or both pokemon is / are dead so can't fight");
    })

})

describe('Test is any pokemon dead function', function () {
    afterEach(() => {
        // Initial state
        carapuce.speed = 43;
        carapuce.life = 44;
        pikachu.speed = 90;
        pikachu.life = 35;
    });

    it('should return true if pikachu dead', function () {
        pikachu.life = 0;
        expect(isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
    });

    it('should return true if squirtle dead', function () {
        carapuce.life = 0;
        expect(isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
    });

    it('should return true if both are dead', function () {
        pikachu.life = 0;
        carapuce.life = 0;
        expect(isAnyPokemonDead(pikachu, carapuce)).toBeTruthy();
    });
    it('should return false if both are alive', function () {
        expect(isAnyPokemonDead(pikachu, carapuce)).toBeFalsy();
    });
})

describe('Test attack interval function', function () {
    afterEach(() => {
        // Initial state
        carapuce.speed = 43;
        carapuce.life = 44;
        pikachu.speed = 90;
        pikachu.life = 35;
    });

    it('should take squirtle to 0 hp when pikachu attack first', async () => {
        carapuce.life = 10;
        await startAttackInterval(pikachu, pikachu, carapuce, 10, false);
        expect(carapuce.life).toBe(0);
    });

    it('should take pikachu to 0 hp when squirtle has to many life attack first', async () => {
        carapuce.life = 3000;
        await startAttackInterval(pikachu, pikachu, carapuce, 10, false);
        expect(pikachu.life).toBe(0);
    });
});
