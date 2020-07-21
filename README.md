<h1 align="center">
  Ajax
</h1>
<p align="center">
  Asynchronous JavaScript and XML
<p>

Engloba un conjunto de tecnologías que funcionan entre sí y proporciona una funcionalidad asyncrónica para comunicarse con el servidor, intercambiar datos y actualizar la página sin tener que recargar el navegador.

💡 Antes se usaba XML ahora se usa más JSON.

[![ajax](https://res.cloudinary.com/marcomontalbano/image/upload/v1592512060/video_to_markdown/images/youtube--qJT2FY1jjjE-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/qJT2FY1jjjE?t=206)
![Arquitectura Ajax](https://jonmircha.com/img/blog/ajax.png)

## 🌐 HTTP

### códigos de estado

| Codigo                      | Descripción                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| **_1xx: Informativo_**      | Request fue recibido de manera correcta y se esta procesando.      |
| **_2xx: Exitoso_**          | Request fue recibido, entendido y aceptado.                        |
| **_3xx: Redirect_**         | Se requiere un accion(para redirecciones).                         |
| **4xx: Error del cliente**  | Request no tiene lo requerido por el servidor.                     |
| **5xx: Error del servidor** | Request fue recibido exitosamente pero hubo un error del servidor. |

#### Más comunes

| Código                | Descripción                                          |
| --------------------- | ---------------------------------------------------- |
| **_400 Bad Request_** | No se enviaron los datos de forma correcta           |
| **_401_**             | No está autorizado necesita una autenticación(token) |
| **_404_**             | No se encontró el recurso solicitado.                |
| **_500_**             | Error interno en el servidor                         |

## ⛔ ActiveXobject

[📖 Documentación](https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/Microsoft_Extensions/ActiveXObject)

Se encuentra deprecado y se usaba para navegadores inferiores a IE8

## [👴 XMLHttpRequest](https://github.com/jhonPariona/_javascript-AJAX/blob/473a1aa57a6d47f05e166c4d6ef6080ee82f58fb/Definition/xmlHttpRequest.js#L38)

[ 📖 W3school](https://www.w3schools.com/xml/ajax_xmlhttprequest_create.asp) |
[📖 MDN](https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) |
[🎬 Jonmircha](https://youtu.be/6CQrK1sS7WA?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&t=740)

Objeto JavaScript para realizar solicitudes, Se hacia uso de eventos.

### Estados

| Estado                | Significado                                                          |
| --------------------- | -------------------------------------------------------------------- |
| **_0 UNINITIALIZED_** | Aun no se a inicializado el request (antes de la escucha del evento) |
| **_1 LOADING_**       | Petición cargando conectado con el servidor                          |
| **_2 LOADED_**        | Petición recibida                                                    |
| **_3 INTERACTIVE_**   | Procesando peticion                                                  |
| **_4 COMPLETE_**      | Completada ya se descargo y podemos renderizarla                     |

```js
function xmlHttpRequestGet($element, METHOD, URI) {
  const xhr = new XMLHttpRequest(); /* Creamos el objeto */

  /* Añadimes un evento */
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState !== 4) return; /* COmprobamos que el estado sea 4 */
    /* Comprobamos el codigo de estado */
    if (xhr.status >= 200 && xhr.status < 300) {
      const dataJSON = JSON.parse(xhr.response); /* Parseamos el resultado */
      renderData($element, dataJSON); /* Usamos una función de renderizado */
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      $element.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  xhr.open(
    METHOD,
    URI
  ); /* 2.abrimos la comunicación hacia el enlace que solicitaremos, recibe tbn en en los parámetros las cabeceras o option en caso de get podemos ignorarlos */

  xhr.send(); /* 3.enviamos */
}
```

funcion de renderizado usando fragment: hacemos un único render en el DOM usando fragment

```js
function renderData($element, objJSON) {
  const $fragment = document.createDocumentFragment(); /* Para hacer una única insercion al tener una lista de objetos */

  objJSON.forEach((item) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
    <h3> ${item.name} </h3>
    <p>email : ${item.email}</p>
    <p>phone : ${item.phone}</p>
    `;
    $fragment.appendChild($li);
  });

  $element.appendChild(
    $fragment
  ); /* realizamos un único renderizado en la página */
}
```

[🎬 xhr traversy media](https://youtu.be/82hnvUYY6QA) |
[🎬 populate table html](https://youtu.be/12tjh_6xL2M) |
[🎬 dcode](https://youtu.be/rjmtYkRK1nM) |
[🎬 learnwebcode](https://youtu.be/rJesac0_Ftw)

## 🧑 Fetch API

[📖 Documentacion](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Utilizando_Fetch) |
[🎬 jhonmircha](https://youtu.be/dYB1UlGGmfk?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&t=176)

```js
function fetchApiGet($element, URI) {
  fetch(URI) /* Recibe como parámetros la url y un objeto de opciones */
    /*realizamos una validacion si no se cumple nos vota al catch  */
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    /* Usamos el mismo render de xmlHttpRequest */
    .then((json) => renderData($element, json))
    .catch((e) => {
      let message = e.statusText || "Ocurrió un error";
      $element.innerHTML = `Error ${e.status}: ${message}`;
    });
}
```

### Async Await

[🎬 jonmircha](https://youtu.be/GP8OCiJLeN4?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&t=183)

```js
function fetchApiAsAw($element, URI) {
  try {
    let res = await fetch(URI),
      json = await res.json();

    /* throw es un return que nos envia al catch */
    if (!res.ok)
      throw { status: res.status, statusText: res.statusText };
    renderData($element, json);
  } catch (error) {
    console.error("fetchApi error -> ", error);
    let message = error.statusText || "Ocurrió un error";
    $element.innerHTML = `Error ${error.status}: ${message}`;
  }
}
```

## 📚 Librerias

### Axios
