function renderData($element, objJSON) {
  const $fragment = document.createDocumentFragment();
  objJSON.forEach((item) => {
    // console.log("renderData -> item", item);
    const $li = document.createElement("li");
    $li.innerHTML = `
    <h3> ${item.name} </h3>
    <p>email : ${item.email}</p>
    <p>phone : ${item.phone}</p>
    `;
    // Agregamos cada uno de los usuarios a un fragment para hacer un único renderizado despues
    $fragment.appendChild($li);
  });
  // realizamos un único renderizado en la página
  $element.appendChild($fragment);
}

export default async function fetchApiAsAw($title, $element, URI) {
  $title.innerHTML = "Fetch API Async Await";
  try {
    let response = await fetch(URI),
      json = await response.json();
    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };
    renderData($element, json);
  } catch (error) {
    console.error("fetchApi error -> ", error);
    let message = error.statusText || "Ocurrió un error";
    $element.innerHTML = `Error ${error.status}: ${message}`;
  }
}
