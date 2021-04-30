import {Pokemon} from "../models/Pokemon";

export async function determinefirstAttacker(pok1: Pokemon, pok2: Pokemon, random = Math.random): Promise<Pokemon> {
    if (pok1.speed !== pok2.speed) {
        return pok1.speed > pok2.speed ? pok1 : pok2;
    }
    return random() > 0.5 ? pok1 : pok2;
}

export function isAnyPokemonDead(pok1: Pokemon, pok2: Pokemon): boolean {
    return pok1.life === 0 || pok2.life === 0;
}

export async function startAttackInterval(attacker: Pokemon, pok1: Pokemon, pok2: Pokemon, resolve: (value: unknown) => void) {
    const interval = setInterval(async () => {
        const victim: Pokemon = attacker == pok1 ? pok2 : pok1
        const damage: number = attacker.attackPokemon(victim);

        console.log(`${attacker.name} attack ${victim.name} and deals ${damage} damage. ${victim.name} has ${victim.life}HP remaining`);

        if (isAnyPokemonDead(pok1, pok2)) {
            resolve('')
            clearInterval(interval)
        }
        attacker = victim;
    }, 1000);
}

export async function fightArena(pok1: Pokemon, pok2: Pokemon): Promise<Pokemon> {

    if (!pok1 || !pok2) {
        throw new Error("Null object provided");
    }

    if (isAnyPokemonDead(pok1, pok2)) {
        throw new Error("One or both pokemon is / are dead so can't fight");
    }

    let attacker: Pokemon = await determinefirstAttacker(pok1, pok2);

    await new Promise(async (resolve) => {
        await startAttackInterval(attacker, pok1, pok2, resolve);
    });
    const winner: Pokemon = pok1.life > 0 ? pok1 : pok2
    console.log(`${winner.name} win the battle`);
    return winner;
}