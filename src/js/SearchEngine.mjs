import PokeServices from "./PokeServices.mjs";

function renderResult(pokemon){
    return `<div class="pokemon-card">
    <a href="/pokemon_pages/index.html?pokemon=${pokemon.id}">
    <h4 class="card_name">${pokemon.name}</h4>
    <h4 class="card_name">#${pokemon.id}</h4>
    <img
        src=${pokemon.sprites.front_default}
        alt="Image of ${pokemon.name}"
    />
    <span class="pokemon-type">Type: ${pokemon.types[0].type.name}</span>
    </a>
</div>`; 
}

export default class SearchBar{
    constructor(pokemon, resultElement){
        this.pokemon = pokemon;
        this.pokeServices = new PokeServices();
        this.resultElement = resultElement;
    }
    async searchPokemon(){
        try {
            let result = await this.pokeServices.getData(this.pokemon);
            this.renderSearchResult(result);
        } catch (error) {
            this.resultElement.innerHTML = "<p>No Pokemon Was found with such name try again</p>";
        }
    }
    renderSearchResult(pokemon){
        let htmlCard = renderResult(pokemon);
        this.resultElement.innerHTML = htmlCard;
    }
}