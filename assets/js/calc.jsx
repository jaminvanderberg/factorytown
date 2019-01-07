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
                var ob = { item: items[item], qty: qty, per: per, critical_time: ct, recipe: recipe, base_complexity: complex,
                    roqty: roqty, children: [], base: {}, total: {}, renewable: true, extra: {}, cost: {}, fuel: recipe.fuel};
                var obs = [ob];

                if (!recipe.ingredients.length) {
                    ob.base[items[item].id] = items[item];
                    if (items[item].renewable == 0) { ob.renewable = false; }
                }

                for (var o2 in recipe.output) {
                    var ro = recipe.output[o2]
                    if (ro.item != item) {
                        ob.extra[ro.item] = { item_name: ro.item_name, item_image: ro.item_image, qty: ro.qty * qty, fuel: ro.fuel * qty, use_as_fuel: 0 }
                        if (recipe.fuel) {
                            var f = Math.min(ob.fuel, ro.fuel);
                            ob.fuel -= f;
                            ob.extra[ro.item].use_as_fuel = f;
                        }
                    }
                }

                if (recipe.cost) { 
                    ob.cost[recipe.coin] = { coin_name: recipe.coin_name, coin_image: recipe.coin_image, coin_ordering: recipe.coin_ordering, coin_class: recipe.coin_class, cost: recipe.cost }; 
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
                            newob.base_complexity += calc[c].base_complexity;
                            if (!calc[c].renewable) { newob.renewable = false; }

                            newob.fuel += calc[c].fuel;
                            
                            for (var b in calc[c].base) {
                                newob.base[b] = calc[c].base[b];
                            }

                            for (var t in calc[c].total) {
                                if (newob.total.hasOwnProperty(t)) {
                                    newob.total[t].per += calc[c].total[t].per;
                                    newob.total[t].qty += calc[c].total[t].qty;
                                }
                                else {
                                    newob.total[t] = calc[c].total[t];
                                }
                            }

                            for (var e in calc[c].extra) {
                                var f = Math.min(calc[c].extra[e].fuel - calc[c].extra[e].use_as_fuel, newob.fuel);
                                newob.fuel -= f;
                                calc[c].extra[e].use_as_fuel += f;

                                if (newob.extra.hasOwnProperty(e)) {
                                    newob.extra[e].qty += calc[c].extra[e].qty;
                                    newob.extra[e].fuel += calc[c].extra[e].fuel;
                                    newob.extra[e].use_as_fuel += calc[c].extra[e].use_as_fuel;
                                } else {
                                    newob.extra[e] = calc[c].extra[e];
                                }
                            }

                            for (var s in calc[c].cost) {
                                if (newob.cost.hasOwnProperty(s)) {
                                    newob.cost[s].cost += calc[c].cost[s].cost;
                                } else {
                                    newob.cost[s] = calc[c].cost[s];
                                }
                            }

                            newob.complexity = newob.base_complexity + newob.fuel * 0.5;

                            newobs.push(newob);
                        }
                        delete calc[c].base;
                        delete calc[c].total;
                        delete calc[c].extra;
                        delete calc[c].cost;
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