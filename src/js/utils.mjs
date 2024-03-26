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
    updateCartItemCount();
    // cartAnimation();
  } else {
    console.error("Header or footer element not found");
  }
}