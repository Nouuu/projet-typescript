import {Pokemon} from './models/Pokemon';
import {getPokemonFromPokedex} from "./utils/pokebuild";
import {fightArena} from "./utils/fight";


async function startBattle() {
    const carapuce: Pokemon | null = await getPokemonFromPokedex("squirtle");
    const pikachu: Pokemon | null = await getPokemonFromPokedex("pikachu");

    if (carapuce === null || pikachu === null) {
        throw new Error("Can't instantiate pokemon");
    }

    carapuce.life *= 4;
    pikachu.life *= 4;

    console.log(`Begin battle between ${carapuce.name} and ${pikachu.name}`);
    await fightArena(carapuce, pikachu);
}


startBattle().finally(() => {
    console.log("Done")
});
