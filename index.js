"use strict";

// import peticion from "./Definition/xmlHttpRequest.js";
import peticion from "./Definition/fetchApi.js";

const $title = document.getElementById("title"),
  $list = document.getElementById("list"),
  URI = "https://jsonplaceholder.typicode.com/users";

peticion($title, $list, URI);
