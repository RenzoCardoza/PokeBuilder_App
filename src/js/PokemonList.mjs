/* eslint-disable no-undef */
import { capitalizeName } from "./utils.mjs";

//template for the pokemon cards (small ones)
function pokemonCardTemplate(pokemon) {
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

export default class PokemonList {
  constructor(pokemonId = null, pokeArray = null, dataSource, listElement, pokemonPage = false) {
    this.pokemonId = pokemonId;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.pokeArray = pokeArray;
    this.pokemonPage = pokemonPage;
  }
  async init() {
    // if this is not a pokemon list page load random 6 pokemon otherwise load it as normal page
    if (!this.pokemonPage){
      let pokemon;
      if (this.pokemonId > 0){
        pokemon = await this.dataSource.getData(this.pokemonId);
      }
      if (this.pokeArray) {
        for (let i = 0; i < 6; i++){
          pokemon = await this.dataSource.getData(this.pokeArray[i]); 
          this.renderPokeCard(pokemon); 
        }
      }
    } else {
      this.renderEntireList(1)
    }
  }
  // method to render a card using the template inside the function above
  renderPokeCard(pokemon){
    let htmlCard = pokemonCardTemplate(pokemon);
    this.listElement.insertAdjacentHTML("afterbegin", htmlCard);
  }
  // method to render the entire list of pokemon through ids
  async renderEntireList(pageNum){
    let pokerange = [];
    const startId = (pageNum - 1) * 40 + 1;
    const endId = pageNum * 40;
      for (let i = startId; i <= endId; i++){
        pokerange.push(i);
      }
      let List = await this.dataSource.getRangeofPokemon(pokerange);
      let homeList = List.reverse();
      this.listElement.innerHTML = "";
      for (let i = 0; i < homeList.length; i++){
        this.renderPokeCard(homeList[i]);
      }
  }
}