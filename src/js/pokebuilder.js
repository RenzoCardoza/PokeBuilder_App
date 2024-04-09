import PokeBuilder from "./PokeTeamBuilder.mjs";
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const teamContainer = document.querySelector(".team-container");
const builder = new PokeBuilder("team", teamContainer);

await builder.init();

// get the delete button to delete from local storage
const deleteBtn = document.getElementsByClassName("deleteBtn");
console.log(deleteBtn);
// add the event listner to every button and delete it if pressed from the localstorage
for (let i = 0; i < deleteBtn.length; i++){
    deleteBtn[i].addEventListener("click", () => {
        const id = deleteBtn[i].id;
        console.log(id);
        let list = getLocalStorage("team");
        list.splice(i, 1);
        setLocalStorage("team", list);
        location.reload();
    });
}