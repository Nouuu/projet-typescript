import {Pokemon} from "../models/Pokemon";


let carapuce: Pokemon = new Pokemon({name: 'squirtle', speed: 43, attack: 48, life: 44});
//Pokemon { name: 'squirtle', speed: 43, attack: 48, life: 44 }
let pikachu: Pokemon = new Pokemon({name: 'pikachu', speed: 90, attack: 55, life: 35});
//Pokemon { name: 'pikachu', speed: 90, attack: 55, life: 35 }

describe('Test pokemon attack other Pokemon function', function () {
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