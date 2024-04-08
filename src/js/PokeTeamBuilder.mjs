import PokeServices from "./PokeServices.mjs";
import { getLocalStorage, capitalizeName } from "./utils.mjs";

//// function template here
function renderPokemonTeamTemplate(pokemon){
    console.log(pokemon);
    const pokemonName = capitalizeName(pokemon.name);
    return `<div class="pokemon-card">
        <img class="deleteBtn" src="/images/close-circle-svgrepo-com.svg" alt="close button">
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
        let pokemonTeam = getLocalStorage(this.key);
        if (pokemonTeam){
            const pokeServices = new PokeServices();
            let teamArray = await pokeServices.getTeamById(pokemonTeam);
            console.log(teamArray);
            this.renderPokemonTeam(teamArray);
        } else {

        }
    }
    renderPokemonTeam(team){
        for (let i = 0; i < team.length; i++){
            const htmlItems = renderPokemonTeamTemplate(team[i]);
            this.parentElement.insertAdjacentHTML("beforeend", htmlItems);
        }
    }
}