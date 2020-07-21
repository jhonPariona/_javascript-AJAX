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

export default function axiosGet($title, $element, URI) {
  $title.innerHTML = "Axios";
  axios
    .get(URI)
    .then((res) => {
      // El json parseado se encuentra en .data
      const json = res.data;
      renderData($element, json);
    })
    .catch((err) => {
      console.error("Axios error -> ", err.response);
      // error se encuentra en el oobjeto response
      let message = err.response.statusText || "Ocurrió un error";
      $element.innerHTML = `Error ${err.response.status}: ${message}`;
    });
}
