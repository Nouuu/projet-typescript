import {Pokemon} from "../models/Pokemon";

export async function determinefirstAttacker(pok1: Pokemon, pok2: Pokemon, random = Math.random): Promise<Pokemon> {
    if (pok1.speed !== pok2.speed) {
        return pok1.speed > pok2.speed ? pok1 : pok2;
    }
    return random() > 0.5 ? pok1 : pok2;
}

export async function fightArena(pok1: Pokemon, pok2: Pokemon): Promise<Pokemon> {


    let attacker: Pokemon = await determinefirstAttacker(pok1, pok2);

    await new Promise(resolve => {
        const interval = setInterval(async () => {
            const victim: Pokemon = attacker == pok1 ? pok2 : pok1
            const damage: number = attacker.attackPokemon(victim);
            console.log(`${attacker.name} attack ${victim.name} and deals ${damage} damage. ${victim.name} has ${victim.life} remaining`);

            if (pok1.life === 0 || pok2.life === 0) {
                resolve('')
                clearInterval(interval)
            }
            attacker = victim;
        }, 1000);
    });

    console.log(`${(pok1.life > 0 ? pok1 : pok2).name} win the battle`);
    return pok1.life > 0 ? pok1 : pok2;
}