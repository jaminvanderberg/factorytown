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
import { Calc } from './calc.jsx';

var root = document.getElementById('ui-base');
var items = JSON.parse(root.getAttribute("data-items"));
var recipes = JSON.parse(root.getAttribute("data-recipes"));
for (var i in items) {
    var calc = Calc.sorted(items, recipes, i, 1);
    if (calc.length != 0) {
        items[i].complexity = calc[0].complexity;
        items[i].sellcomp = (items[i].sell ? items[i].complexity / items[i].sell : "");
        items[i].renewable = false;
        for (var c in calc) {
            if (calc[c].renewable) { items[i].renewable = true; break; }
        }
    }
}
var categories = JSON.parse(root.getAttribute("data-categories"));
var coins = JSON.parse(root.getAttribute("data-coins"));

ReactDOM.render(
    <UI items={items} recipes={recipes} categories={categories} coins={coins} />,
    document.getElementById('ui-base')
);