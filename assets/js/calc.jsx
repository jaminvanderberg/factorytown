export class Calc {
    static sorted(items, recipes, item, qty) {
        var calc = Calc.calc(items, recipes, item, qty);
        calc.sort(function (a, b) {
            return a.complexity - b.complexity;
        });
        return calc;
    }
    
    static calc(items, recipes, item, qty, time) {
        if (typeof items[item] == 'undefined') {
            return { error: "No item: " + item };
        }
        var ret = [];
        for (var r in recipes) {
            var recipe = recipes[r];
            for (var o in recipe.output) {
                if (recipe.output[o].item != item) {
                    continue;
                }
                var roqty = recipe.output[o].qty;
                if (typeof time == 'undefined') {
                    time = recipe.time;
                }
                var ct = time / qty;
                var per = (recipe.time / ct) / roqty;
                var complex = recipe.complexity * Math.ceil(per);
                var ob = { item: items[item], qty: qty, per: per, critical_time: ct, recipe: recipe, complexity: complex, roqty: roqty, children: [], base: {}, total: {}, renewable: true };
                var obs = [ob];
                if (!recipe.ingredients.length) {
                    ob.base[items[item].id] = items[item];
                    if (items[item].renewable == 0) { ob.renewable = false; }
                }
                ob.total[item] = { item: items[item].name, item_image: items[item].image, qty: qty, per: per, building: recipe.building_name, building_image: recipe.building_image, time: recipe.time };
                for (var i in recipe.ingredients) {
                    var ing = recipe.ingredients[i];
                    var calc = Calc.calc(items, recipes, ing.item, ing.qty * qty, time);
                    var newobs = [];
                    for (var c in calc) {
                        for (var o in obs) {
                            var newob = JSON.parse(JSON.stringify(obs[o]));
                            newob.children.push(calc[c]);
                            newob.complexity += calc[c].complexity;
                            if (!calc[c].renewable) { newob.renewable = false; }
                            for (var b in calc[c].base) {
                                newob.base[b] = calc[c].base[b];
                            }
                            delete calc[c].base;
                            for (var t in calc[c].total) {
                                if (newob.total.hasOwnProperty(t)) {
                                    newob.total[t].per += calc[c].total[t].per;
                                    newob.total[t].qty += calc[c].total[t].qty;
                                }
                                else {
                                    newob.total[t] = calc[c].total[t];
                                }
                            }
                            delete calc[c].total;
                            newobs.push(newob);
                        }
                    }
                    obs = newobs;
                }
                for (var o in obs) {
                    ret.push(obs[o]);
                }
            }
        }
        return ret;
    }
}