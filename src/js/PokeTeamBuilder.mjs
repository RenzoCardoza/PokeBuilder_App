import PokeServices from "./PokeServices.mjs";
import { getLocalStorage, capitalizeName, setLocalStorage } from "./utils.mjs";

//// function template here
function renderPokemonTeamTemplate(pokemon){
    const pokemonName = capitalizeName(pokemon.name);
    const pokemonType = capitalizeName(pokemon.types[0].type.name)
    return `<div class="pokemon-card">
        <img class="deleteBtn" id="${pokemon.id}" src="/images/close-circle-svgrepo-com.svg" alt="close button">
        <a href="/pokemon_pages/index.html?pokemon=${pokemon.id}">
            <h4 class="card_name">${pokemonName}</h4>
            <h4 class="card_name">#${pokemon.id}</h4>
            <img
                src=${pokemon.sprites.front_default}
                alt="Image of ${pokemonName}"
            />
            <span class="pokemon-type">Type: ${pokemonType}</span>
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
        if (pokemonTeam.length > 0){
            const pokeServices = new PokeServices();
            let teamArray = await pokeServices.getTeamById(pokemonTeam);
            this.renderPokemonTeam(teamArray);
        } else { 
            if (pokemonTeam.length == 0){
                let htmlSnippet = `<h3>Your selected Pokémon will appear here</h3>`;
                this.parentElement.innerHTML = htmlSnippet;
            }
        }
        this.createEventListener();
    }
    renderPokemonTeam(team){
        for (let i = 0; i < team.length; i++){
            const htmlItems = renderPokemonTeamTemplate(team[i]);
            this.parentElement.insertAdjacentHTML("beforeend", htmlItems);
        }
    }
    createEventListener(){
        // get the delete button to delete from local storage
        const deleteBtn = document.getElementsByClassName("deleteBtn");
        console.log(deleteBtn);
        // add the event listner to every button and delete it if pressed from the localstorage
        for (let i = 0; i < deleteBtn.length; i++){
            deleteBtn[i].addEventListener("click", () => {
                let list = getLocalStorage("team");
                list.splice(i, 1);
                setLocalStorage("team", list);
                location.reload();
            });
        }
    }
}