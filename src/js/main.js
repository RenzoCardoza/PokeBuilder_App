import PokeServices from "./PokeServices.mjs";
import PokemonList from "./PokemonList.mjs";
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

// call the method to get the header and the footer for the app
loadHeaderFooter();
//create an array with six different ids to find pokemons
let pokeArray = [];
for (let i=0; i < 6; i++){
    // Get a random number between 0 to 600;
    let rndInt = Math.floor(Math.random() * 700) + 1;
    // add the number to the data source
    pokeArray.push(rndInt);
}

// get the random six pokemon every time it loads
const dataSource = new PokeServices();
const element = document.querySelector(".card-container");
const pokemonList = new PokemonList(null, pokeArray, dataSource, element);
// initialize the object -- display array to the home screen
pokemonList.init();


/* *******************************
Functionality of the search bar
******************************* */
let recentSearch = [];

const searchBtn = document.querySelector("#searchPkmn");
searchBtn.addEventListener("click", (event) => {
    const inputValue = document.getElementById("pkmnName").value;
    let localSearch = getLocalStorage("searches");
    if (!localSearch && inputValue != ""){
        recentSearch.push(inputValue)
        setLocalStorage("searches", recentSearch);
    } else {
        if (inputValue != ""){
            localSearch.push(inputValue);
            setLocalStorage("searches", localSearch);
        } else {
            alert("Please enter a pokemon on the search bar");
        }
    }
});

/* *********************************
recent searches elements and display 
********************************** */
let searchElement = document.querySelector("#recent-search-list");

function createPElements(){
    let recentSearches = getLocalStorage("searches");
    if (recentSearches){
        for (let i = 0; i < recentSearches.length && i < 4; i++){
            if (recentSearches.length > 4){
                recentSearches.splice(1, 1);
                setLocalStorage("searches", recentSearches);
            }
            let p = document.createElement("p");
            p.setAttribute("class", "r-search-p");
            p.innerHTML = recentSearches[i];
            searchElement.appendChild(p);
        }
    } else {
        searchElement.innerHTML = "<p>No Recent Searches were made</p>";
    }
}
createPElements();

/* ************************** 
Interact with the newsletter button
****************************** */
let joinBtn = document.querySelector("#joinBtn");
joinBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    let form = document.querySelector("#joinfrm");
    form.style.display = "block";
    joinBtn.style.display = "none";
    // now get the button for the join 
    const secondJoinBtn = document.querySelector("#second-join");
    secondJoinBtn.addEventListener("click", (event) => {
        event.preventDefault();
        form.style.display = "none";
        document.querySelector("#conf-msg").style.display = "block";
    });
});