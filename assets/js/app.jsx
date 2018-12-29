/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.scss');
require('bootstrap');

//require('./ui.jsx');

import { UI } from './ui.jsx';

var root = document.getElementById('ui-base');
ReactDOM.render(
    <UI items={JSON.parse(root.getAttribute("data-items"))} recipes={JSON.parse(root.getAttribute("data-recipes"))} />,
    document.getElementById('ui-base')
);