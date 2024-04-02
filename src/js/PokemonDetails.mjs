import { capitalizeName } from "./utils.mjs"

function pokemonDetailsTemplate(pokemon){
    const pokeName = capitalizeName(pokemon.name);
    const ability = capitalizeName(pokemon.abilities[0].ability.name)
    return `<div class="pokemon-details-card">
        <h3 class="pokemonTitle">${pokeName} - #${pokemon.id}</h3>
        <div class="pokemon-details">
            <img 
                id="sprite"
                src=${pokemon.sprites.front_default}
                alt="image of ${pokeName}"
            > 
            <p class="pokemon-stats" id="baseExp">Base Experience: ${pokemon.base_experience}</p>
            <p class="pokemon-stats" id="height">Height: ${pokemon.height}</p>
            <p class="pokemon-stats" id="ability">Ability: ${ability}</p>
        </div>
        <button class="addPokeBuildBtn">Add to the Builder</button>
    </div>`
}

export default class PokemonDetails {
    constructor(pokemonId, dataSource, mainElement){
        this.pokemonId = pokemonId;
        this.dataSource = dataSource;
        this.pokemon = [];
        this.mainElement = mainElement;
    }
    async init(){
        //get the details of the pokemon by the ID using the pokeservices
        this.pokemon = await this.dataSource.findPokemonById(this.pokemonId);
        //render it to the main using the template function above
        this.renderPokemonDetails(this.mainElement);
    }
    renderPokemonDetails(element){
        let details = pokemonDetailsTemplate(this.pokemon);
        //insert the html snippet into the code
        element.innerHTML = details;
    }
}