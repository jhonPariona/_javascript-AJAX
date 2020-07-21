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

export default async function axiosAsAw($title, $element, URI) {
  $title.innerHTML = "Axios Async Await";
  try {
    let response = await axios.get(URI),
      json = await response.data;
    renderData($element, json);
  } catch (err) {
    const message = err.response.statusText || "Ocurrio un error";
    $element.innerHTML = `${err.response.status} : ${message}`;
  }
}
