"use strict";

import peticion from "./Definition/xmlHttpRequest.js";

const $title = document.getElementById("title");
const $list = document.getElementById("list");

peticion($title, $list);
