'use strict';

const $ = require("jquery");

window.jQuery = $;

if ($) {
    require('bootstrap');
    require("./scss/required.scss");
    require("./js/index.js");
}