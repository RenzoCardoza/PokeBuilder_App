import PokeServices from "./PokeServices.mjs";
import PokemonDetails from "./PokemonDetails.mjs";
import { loadHeaderFooter, getParam, setLocalStorage, getLocalStorage } from "./utils.mjs";

// load the dynamic header and footer
loadHeaderFooter();

const dataSource = new PokeServices();
const parameter = getParam("pokemon");
const pokemonId = parseInt(parameter);
const cardContainer = document.querySelector("#top-details");
const moveContainer = document.querySelector("#move-list");
const pokemonDetails = new PokemonDetails(pokemonId, dataSource, cardContainer, moveContainer);

await pokemonDetails.init();

// get the button element 
const addBtn = document.querySelector(".addPokeBuildBtn");
addBtn.addEventListener("click", () => {
    let teamList = getLocalStorage("team");
    if (!teamList){
        let list = [];
        list.push(pokemonId);
        setLocalStorage("team", list);
        addBtn.innerHTML = "Added Successfully";
    } else  if (teamList.length < 6){    
        teamList.push(pokemonId);
        setLocalStorage("team", teamList);
        addBtn.innerHTML = "Added Successfully";
    } else {
        addBtn.innerHTML = "Edit your team first";
    }
});