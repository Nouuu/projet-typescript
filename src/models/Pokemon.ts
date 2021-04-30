interface PokemonProps {
    name: string;
    speed: number;
    life: number;
    attack: number;
}

export class Pokemon implements PokemonProps {
    name: string;
    speed: number;
    attack: number;
    life: number;

    constructor(props: PokemonProps) {
        this.name = props.name;
        this.speed = props.speed;
        this.attack = props.attack;
        this.life = props.life;
    }

    attackPokemon(other: Pokemon, random = Math.random): void {
        if (this.life > 0) {
            let multiplier = 1;
            if (random() > 0.9) {
                multiplier = 2;
            }
            other.life = Math.max(0, other.life - (this.attack / 2) * multiplier);
        }
    }
}