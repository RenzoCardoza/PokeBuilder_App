import { capitalizeName } from "./utils.mjs"

//function that has the template for the details card
function pokemonDetailsTemplate(pokemon, moves){
    const pokeName = capitalizeName(pokemon.name);
    const ability = capitalizeName(pokemon.abilities[0].ability.name);
    return `<h2 id="pokemonDetailsTitle">Pokemon Details</h2>
        <div class="pokemon-details-card">
            <h3 class="pokemonTitle">${pokeName} - #${pokemon.id}</h3>
            <div class="pokemon-details">
                <img 
                    id="sprite"
                    src=${pokemon.sprites.front_default}
                    alt="image of ${pokeName}"
                >
                <div id="p-details"> 
                    <p class="pokemon-stats" id="baseExp">Base Experience: ${pokemon.base_experience}</p>
                    <p class="pokemon-stats" id="height">Height: ${pokemon.height}</p>
                    <p class="pokemon-stats" id="ability">Ability: ${ability}</p>
                    <p class="pokemon-stats" id="pokemon-type">Type: ${pokemon.types[0].type.name}</p>
                </div>
            </div>
            <button class="addPokeBuildBtn">Add to the Builder</button>
    </div>`
}

// function that will have the template for the moves of the pokemon
function pokemonMovesTemplate(moves){
    
}

export default class PokemonDetails {
    constructor(pokemonId, dataSource, cardContainer, moveContainer){
        this.pokemonId = pokemonId;
        this.dataSource = dataSource;
        this.pokemon = [];
        this.moves = [];
        this.cardContainer = cardContainer;
        this.movesContainer = moveContainer
    }
    async init(){
        //get the details of the pokemon by the ID using the pokeservices
        this.pokemon = await this.dataSource.findPokemonById(this.pokemonId);
        this.moves = this.getPokemonMoves(this.pokemon);
        //render it to the main using the template function above
        this.renderPokemonDetails(this.cardContainer, this.movesContainer, this.moves);
    }
    renderPokemonDetails(cardElement, moveContainer, moveList){
        let details = pokemonDetailsTemplate(this.pokemon);
        //insert the html snippet into the code
        // element.innerHTML = details;
        cardElement.insertAdjacentHTML("afterbegin", details);
        /// here will be the code to iterate through the list and display the p elements
        /////////////////////////////////////// CODE GOES HERE ///////////////////////
    }
    getPokemonMoves(pokemon){
        //this array will contain p elements
        const pElements = [];
        for (let i = 0; i < pokemon.moves.length; i++){
            //create a p element and add the text from the api to the innerHTML property
            let pElement = document.createElement("p");
            pElement.innerHTML = pokemon.moves[i].move.name;
            pElements.push(pElement);
        }
        return pElements;
    }
}