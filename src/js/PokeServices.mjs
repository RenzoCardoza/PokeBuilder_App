const baseURL = import.meta.env.VITE_SERVER_URL;

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
    // this.path = `../json/${this.pokemon}.json`; // check this first
  }
  async getData(pokemon) {
    const response = await fetch(baseURL + `${pokemon}`); // this should work -- test it first
    const data = await convertToJson(response);
    console.log(data);
    return data;
  }
  async findPokemonById(pokemonId) {
    const response = await fetch(baseURL + `${pokemonId}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}