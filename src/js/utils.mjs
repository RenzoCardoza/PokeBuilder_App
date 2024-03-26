// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/* **************************
Function to load partials
****************************** */
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

/* ****************************************************
Function render content to the main site with a partial 
******************************************************* */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
  if (callback) {
    callback(data);
  }
}

/* **************************
Function to make the header and footer dynamic
****************************** */
export async function loadHeaderFooter() {
  const headerElement = document.getElementById("page-header");
  const footerElement = document.getElementById("page-footer");

  if (headerElement && footerElement) {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

  } else {
    console.error("Header or footer element not found");
  }
}