/* eslint-disable no-undef */
import { capitalizeName } from "./utils.mjs";

function pokemonCardTemplate(pokemon) {
    const pokemonName = capitalizeName(pokemon.name);
    return `<li class="pokemon-card">
    <a href="/pokemon_pages/index.html?pokemon=${pokemon.id}">
    <h4 class="card_name">${pokemonName}</h4>
    <h4 class="card_name">#${pokemon.id}</h4>
    <img
        src=${pokemon.sprites.front_default}
        alt="Image of ${pokemonName}"
    />
    <span class="pokemon-type">Type: ${pokemon.types[0].type.name}</span>
    </a>
</li>`;
}

export default class PokemonList {
  constructor(pokemonId = null, pokeArray = null, dataSource, listElement) {
    this.pokemonId = pokemonId;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.pokeArray = pokeArray;
  }
  async init() {
    let pokemon;
    if (this.pokemonId > 0){
        pokemon = await this.dataSource.getData(this.pokemonId);
    }
    if (this.pokeArray) {
        for (let i = 0; i < 7; i++){
            pokemon = await this.dataSource.getData(this.pokeArray[i]); 
            console.log(pokemon);
            this.renderPokeCard(pokemon); 
        }
    }
  }
  renderPokeCard(pokemon){
    // renderPokemonCardTemplate(pokemonCardTemplate(), this.listElement, pokemon);
    let htmlCard = pokemonCardTemplate(pokemon);
    console.log(htmlCard);
    // this.listElement.innerHTML = htmlCard;
    this.listElement.insertAdjacentHTML("afterbegin", htmlCard);
  }
}