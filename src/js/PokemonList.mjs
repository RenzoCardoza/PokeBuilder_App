/* eslint-disable no-undef */
import { capitalizeName } from "./utils.mjs";

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
    if (!this.pokemonPage){
      let pokemon;
      if (this.pokemonId > 0){
        pokemon = await this.dataSource.getData(this.pokemonId);
      }
      if (this.pokeArray) {
        for (let i = 0; i < 7; i++){
          pokemon = await this.dataSource.getData(this.pokeArray[i]); 
          this.renderPokeCard(pokemon); 
        }
      }
    } else {
      let pokerange = []
      for (let i = 0; i < 40; i++){
        pokerange.push(i);
      }
      let List = await this.dataSource.getRangeofPokemon(pokerange);
      let homeList = List.reverse();
      console.log(homeList);
      for (let i = 0; i < homeList.length; i++){
        this.renderPokeCard(homeList[i]);
      }
    }
  }
  renderPokeCard(pokemon){
    // renderPokemonCardTemplate(pokemonCardTemplate(), this.listElement, pokemon);
    let htmlCard = pokemonCardTemplate(pokemon);
    // this.listElement.innerHTML = htmlCard;
    this.listElement.insertAdjacentHTML("afterbegin", htmlCard);
  }
}