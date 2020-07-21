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

export default function fetchApi($title, $element, URI) {
  $title.innerHTML = "Fetch API";
  fetch(URI) /* Recibe como parámetros la url y un objeto de opciones */
    .then((response /* Regresa un objeto response */) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((json) => renderData($element, json))
    .catch((e) => {
      console.error("fetchApi -> e", e);
      let message = e.statusText || "Ocurrió un error";
      $element.innerHTML = `Error ${e.status}: ${message}`;
    });
}
