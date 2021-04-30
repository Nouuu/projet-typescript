import {Pokemon} from "../models/Pokemon";

export function determinefirstAttacker(pok1: Pokemon, pok2: Pokemon, random = Math.random): Pokemon {
    if (pok1.speed !== pok2.speed) {
        return pok1.speed > pok2.speed ? pok1 : pok2;
    }
    return random() > 0.5 ? pok1 : pok2;
}
