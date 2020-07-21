<h1 align="center">
  Ajax
</h1>
<p align="center">
  Asynchronous JavaScript and XML
<p>

Engloba un conjunto de tecnologías que funcionan entre sí y proporciona una funcionalidad asyncrónica para comunicarse con el servidor, intercambiar datos y actualizar la página sin tener que recargar el navegador.

💡 Antes se usaba XML ahora se usa más JSON.

<details>
<summary>📜 Índice</summary>
<ul>
<li class="has-line-data" data-line-start="0" data-line-end="3"><a href="#-http">🌐 HTTP</a>
<ul>
<li class="has-line-data" data-line-start="1" data-line-end="3"><a href="#c%C3%B3digos-de-estado">códigos de estado</a>
<ul>
<li class="has-line-data" data-line-start="2" data-line-end="3"><a href="#m%C3%A1s-comunes">Más comunes</a></li>
</ul>
</li>
</ul>
</li>
<li class="has-line-data" data-line-start="3" data-line-end="4"><a href="#-activexobject">⛔ ActiveXobject</a></li>
<li class="has-line-data" data-line-start="4" data-line-end="7"><a href="#-xmlhttprequest">👴 XMLHttpRequest</a>
<ul>
<li class="has-line-data" data-line-start="5" data-line-end="6"><a href="#estados">Estados</a></li>
<li class="has-line-data" data-line-start="6" data-line-end="7"><a href="#projects">Projects</a></li>
</ul>
</li>
<li class="has-line-data" data-line-start="7" data-line-end="9"><a href="#-fetch-api">🧑 Fetch API</a>
<ul>
<li class="has-line-data" data-line-start="8" data-line-end="9"><a href="#fetch-async-await">Fetch Async Await</a></li>
</ul>
</li>
<li class="has-line-data" data-line-start="9" data-line-end="12"><a href="#-librerias">📚 Librerias</a>
<ul>
<li class="has-line-data" data-line-start="10" data-line-end="11"><a href="#axios">Axios</a></li>
<ul>
  <li class="has-line-data" data-line-start="11" data-line-end="12"><a href="#axios-async-await">Axios Async Await</a></li>
</ul>
</ul>
</li>
</ul>
</details>

<hr/>

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

### Projects

[🐙 consumo PokeAPI xmlHttpRequest](https://github.com/wilderPariona/XMLHTTPRequest)

**_🌳 TODOS:_**

[🎬 xhr traversy media](https://youtu.be/82hnvUYY6QA) |
[🎬 populate table html](https://youtu.be/12tjh_6xL2M) |
[🎬 dcode](https://youtu.be/rjmtYkRK1nM) |
[🎬 learnwebcode](https://youtu.be/rJesac0_Ftw)

## [🧑 Fetch API](https://github.com/jhonPariona/_javascript-AJAX/blob/9a893afc932ed3d78c284de917402fbcfd1ffad3/Definition/fetchApi.js#L20)

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

### [Fetch Async Await](https://github.com/jhonPariona/_javascript-AJAX/blob/9a893afc932ed3d78c284de917402fbcfd1ffad3/Definition/fetchApiAsyncAwait.js#L20)

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

**_🌳 TODOS:_**

[🎬 fetch project](https://www.youtube.com/watch?v=DbcLg8nRWEg&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=1) |
[🎬 fetch](https://youtu.be/jK5zzSA2JHI) |
[🎬 Servidor nodejs](https://www.youtube.com/watch?v=2z6lyszRhkE) |
[🎬 Fetch uso basico](https://youtu.be/aKPcs-EIzZI)|
[🎬 fetch](https://youtu.be/Pi6wkdU2vR4)|
[🎬 fetch proyecto](https://www.youtube.com/watch?v=PoDsSsJnEW4&list=PLPl81lqbj-4JXPTIPbIvWED-xTVmOzhrf&index=2)|
[🎬 fetch proyecto](https://youtu.be/Oive66jrwBs)|
[🎬 fetch](https://youtu.be/gOBluM4NMj8)|
[🎬 fetch](https://youtu.be/lh8pHW9vwEA)|
[🎬 fetch](https://youtu.be/cuEtnrL9-H0)|
[🎬 fetch](https://youtu.be/c3qWHnJJbSY?list=RDQMoE0BWBCpnek)|
[🎬 fetch real time](https://youtu.be/E0UGGxd2DOo?list=RDQMoE0BWBCpnek)|
[🎬 consumir xml](https://youtu.be/MDAWie2Sicc?list=RDQMoE0BWBCpnek)|
[🎬 fetch async await](https://youtu.be/h6Zo8cxCFoY?list=RDQMoE0BWBCpnek)|
[🎬 project fetch](https://youtu.be/7f2HNadULOs)|
[🎬 project fetch](https://youtu.be/FN_ffvw_ksE)|
[🎬 app gatitos](https://youtu.be/L4-Immxr9bY)|
[🎬 diferencia fetch y ajax](https://youtu.be/V_acKBZ1ZPU)|
[🎬 fetch freecodecamp](https://youtu.be/2EagS0UtXeM)|
[🎬 reat fetch](https://youtu.be/_miJYtRqSRQ)|
[🎬 fetch con react](https://youtu.be/o5CdCETh8cQ)|
[🎬 todo con react](https://youtu.be/N8kYlimhuLw)|
[🎬 fetch react](https://youtu.be/T3Px88x_PsA)|
[🎬 fetch react](https://youtu.be/aNMY0lrWZXU)|
[🎬 fetch react](https://youtu.be/204C9yNeOYI)|
[🎬 fetch react](https://youtu.be/0au5_YFo4FE)|
[🎬 react](https://youtu.be/nf_3AsfPODs)|
[🎬 fectch con node](https://youtu.be/ZcbsdShPPoE)|
[🎬 react](https://youtu.be/GlXMtV0ylK0)|

## 📚 Librerias

### [Axios](https://github.com/jhonPariona/_javascript-AJAX/blob/70bf35b85bc498eab4f470d4e1ab34e1f7a39f55/Definition/axios.js#L20)

[📖 Documentación](https://github.com/axios/axios) |
[🎬 jhonmircha](https://youtu.be/uxsEZgkcvFU?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&t=128)

```js
function axiosGet($element, URI) {
  axios
    .get(URI)
    .then((res) => {
      const json = res.data;
      renderData(
        $element,
        json
      ); /* usamos el render que usamos en xmlHttprequest */
    })
    .catch((err) => {
      let message = err.response.statusText || "Ocurrió un error";
      $element.innerHTML = `Error ${err.response.status}: ${message}`;
    });
}
```

#### [Axios Async Await](https://github.com/jhonPariona/_javascript-AJAX/blob/70bf35b85bc498eab4f470d4e1ab34e1f7a39f55/Definition/axiosAsyncAwait.js#L20)

[🎬 jhonmircha](https://youtu.be/SBr_EVNErPk?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&t=166)

```js
function axiosAsAw($element, URI) {
  try {
    let res = await axios.get(URI),
      json = await res.data;
    renderData($element, json);
  } catch (err) {
    const message = err.res.statusText || "Ocurrio un error";
    $element.innerHTML = `${err.res.status} : ${message}`;
  }
}
```

**_🌳 TODOS:_**

[🎬 axios](https://youtu.be/6LyagkoRWYA?list=RDQMoE0BWBCpnek) |
[🎬 axios react](https://youtu.be/oQnojIyTXb8) |
[🎬 axios react](https://youtu.be/kch6F2m0fkg) |
[🎬 axios reaact](https://youtu.be/qiu7e_E6P9c) |
[🎬 redux](https://youtu.be/EgGXWQEmsQ0) |
[🎬 axios y fetch](https://www.youtube.com/watch?v=UvIMWDHyFko) |
