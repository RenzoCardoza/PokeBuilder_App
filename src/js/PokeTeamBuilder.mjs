import { getLocalStorage, setLocalStorage, capitalizeName } from "./utils.mjs";

//// function template here
function renderPokemonTeam(pokemon){
    const pokemonName = capitalizeName(pokemon.name);
    return `<div class="pokemon-card">
        <a href="/pokemon_pages/index.html?pokemon=${pokemon.id}">
            <h4 class="card_name">${pokemonName}</h4>
            <h4 class="card_name">#${pokemon.id}</h4>
            <img
                src=${pokemon.sprites.front_default}
                alt="Image of ${pokemonName}"
            />
            <span class="pokemon-type">Type: ${pokemon.types[0].type.name}</span>
        </a>
    </div>`;
}


// class to create the object of the pokebuilder
export default class PokeBuilder{
    constructor(key, parentElement){
        this.key = key;
        this.parentElement = parentElement;
    }
    async init(){
        const pokemonTeam = getLocalStorage(this.key);
        if (pokemonTeam){
            renderPokemonTeam(pokemonTeam);
        }
    }
    renderPokemonTeam(team){
        const htmlItems = team.map((pokemon) => {renderPokemonTeam(pokemon)});
        this.parentElement.innerHTML = htmlItems;
    }
    addToBuilder(pokemon){
        
    }
}