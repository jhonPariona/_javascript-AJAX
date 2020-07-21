/* Stados que existen en XMLHTTPRequest */
function status(readyState) {
  switch (readyState) {
    case 0:
      return "Aun no se a inicializado el request";
    case 1:
      return "Petición cargando conectado con el servidor";
    case 2:
      return "Petición recibida";
    case 3:
      return "Procesando peticion: interactive";
    case 4:
      return "Completada ya se descargo y podemos renderizarla";
  }
}

function renderData($element, $fragment, objJSON) {
  // console.log("renderData -> $element, objJSON", $element, objJSON);
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

export default function xmlHttpRequest($title, $list) {
  $title.innerHTML = "XmlHttpRequest";

  // creamos el objeto xhr, $fragment se usara para hacer una única insercion al DOM en vez de insertar cada usuario que obtengamos mejora el rendimiento
  const xhr = new XMLHttpRequest(),
    $fragment = document.createDocumentFragment(),
    METHOD = "GET",
    URI = "https://jsonplaceholder.typicode.com/users";

  // El estado inicial es 0
  console.log(`State => ${xhr.readyState} es ${status(xhr.readyState)}`);

  // 1. escuchamos los eventos de cambio
  xhr.addEventListener("readystatechange", () => {
    // Se dan los demás estados
    console.log(`State => ${xhr.readyState} es ${status(xhr.readyState)}`);

    // Hacems una comprobacion de que el estado sea el 4(la informacion ya esta lista)
    if (xhr.readyState !== 4) return;

    // Hacemos una segunda comprobacion para ver si la respuesta es correcta
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("correcto");
      const dataJSON = JSON.parse(xhr.responseText);
      renderData($list, $fragment, dataJSON);
    } else {
      console.error("error");
      let message = xhr.statusText || "Ocurrió un error";
      $list.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  //2.abrimos la comunicación hacia el enlace que solicitaremos, recibe tbn en en los parámetros las cabeceras o option en caso de get podemos ignorarlos
  xhr.open(METHOD, URI);

  //3.enviamos
  xhr.send();
}
