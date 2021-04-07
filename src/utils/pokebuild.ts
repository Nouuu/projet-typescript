import {Pokemon} from "../models/Pokemon";

export const Pokedex = require("pokedex-promise-v2")
export const P = new Pokedex();


export async function getPokemonFromPokedex(name: string): Promise<Pokemon | null> {
    const pokemonFromApi = await P.getPokemonByName(name).catch(() => {
        return null;
    });
    if (!pokemonFromApi) {
        return null;
    }

    const speed: number = pokemonFromApi.stats.find((element: any) => {
        return element.stat.name === 'speed'
    }).base_stat;

    const attack: number = pokemonFromApi.stats.find((element: any) => {
        return element.stat.name === 'attack'
    }).base_stat;

    const life: number = pokemonFromApi.stats.find((element: any) => {
        return element.stat.name === 'hp'
    }).base_stat;

    return new Pokemon({name, speed, attack, life});
}