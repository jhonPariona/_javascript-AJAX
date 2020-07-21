"use strict";

// import peticion from "./Definition/xmlHttpRequest.js";
// import peticion from "./Definition/fetchApi.js";
// import peticion from "./Definition/fetchApiAsyncAwait.js";
// import peticion from "./Definition/axios.js";
import peticion from "./Definition/axiosAsyncAwait.js";

const $title = document.getElementById("title"),
  $list = document.getElementById("list"),
  URI = "https://jsonplaceholder.typicode.com/user";

peticion($title, $list, URI);
