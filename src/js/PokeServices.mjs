const baseURLP = import.meta.env.VITE_SERVER_URL;
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class PokeServices {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }
  async getData(pokemon) {
    const response = await fetch(baseURL + `${pokemon}`);
    const data = await convertToJson(response);
    return data;
  }
  async findPokemonById(pokemonId) {
    const response = await fetch(baseURL + `${pokemonId}`);
    const data = await convertToJson(response);
    return data;
  }
  async getRangeofPokemon(range){
    let pokeArray = [];
    for (let i = range[0]; i <= range[range.length - 1]; i++){
      const response = await fetch(baseURL + `${i}`);
      const data = await convertToJson(response);
      pokeArray.push(data);
    }
    return pokeArray
  }
  async getTeamById(teamIds){
    let teamArray = [];
    for (let i = 0; i < teamIds.length; i++){
      let teamMember = await this.findPokemonById(teamIds[i]);
      teamArray.push(teamMember);
    }
    return teamArray;
  }
}