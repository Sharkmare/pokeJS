Commands.pokedex = {
    name: 'pokedex',
    hidden: true,
    help: '',
    usage: 'pokemon/item [pokemon/item]',
    noDM: false,
    level: 0,
    fn: function(msg, suffix, bot) {
        var dir = "G:/resources/"
        suffix = suffix.split(" ")
        switch (suffix[0]) {
            case "pokemon":
            case "ability":
            case "type":
            case "move":
            case "item":
                break;
            default:
                suffix = "error";
                return msg.channel.sendMessage(suffix)
        }
        path = suffix.join("/")

        console.log(path);
        if (!fs.existsSync(dir + path)) {
            pokelookup(suffix, msg, dir)
        } else {
            var result = [];
            fs.readFile(dir + path, 'utf8', function(err, x) {
                if (err) {
                    return console.log(err);
                }
                if (x == "Not Found") {
                    msg.reply(x)
                }
                x = JSON.parse(x)
                pokeparse(suffix, x, msg)
            })




        }
    }
}




function pokelookup(suffix, msg, dir) {

    path = suffix.join("/")
    console.log(path)
    const READYSTATE = 4
    const Http = new XMLHttpRequest();
    const url = `https://pokeapi.co/api/v2/${path}`;
    y = []

    var x;
    Http.open("GET", url);
    Http.setRequestHeader(`Authorization`, `The big gay`)
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState == READYSTATE) {
            if (Http.responseText == 'Not Found') {
                fs.writeFile(dir + path, Http.responseText, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(path + " has been logged");
                })
                return msg.channel.sendMessage("Not Found")
            }
            x = JSON.parse(Http.responseText)
            fs.writeFile(dir + path, Http.responseText, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log(path + " has been logged");
            })
            pokeparse(suffix, x, msg)


        }
    }

}

function pokeparse(suffix, x, msg) {
    var result = [];
    switch (suffix[0]) {
        case "pokemon":
            result.push('Pokedex ID: ' + x.id)
            result.push('name: ' + x.species.name)
            result.push('weight: ' + x.weight / 10 + " kg")
            if (x.height <= 9) {
                result.push('height: ' + x.height * 10 + " cm")
            } else result.push('height: ' + x.height / 10 + " m")
            return msg.channel.sendMessage(result.join("\n"))
            break;
        case "item":
            result.push(x.name)
            result.push(x.effect_entries[0].effect.split("\n").join(" "))
            return msg.channel.sendMessage(result.join("\n"))

        case "type":
            var take2dmg = [];
            var give2dmg = [];
            var takehalfdmg = [];
            var givehalfdmg = [];
            var takenodmg = [];
            var givenodmg = [];
            dmgcalc = x.damage_relations

            takedoubledmgcalc = dmgcalc.double_damage_from;
            dmgcalcname(takedoubledmgcalc, take2dmg);
            givedoubledmgcalc = dmgcalc.double_damage_to;
            dmgcalcname(givedoubledmgcalc, give2dmg);
            takehalfdmgcalc = dmgcalc.half_damage_from;
            dmgcalcname(takehalfdmgcalc, takehalfdmg)
            givehalfdmgcalc = dmgcalc.half_damage_to;
            dmgcalcname(givehalfdmgcalc, givehalfdmg)
            takenodmgcalc = dmgcalc.no_damage_from;
            dmgcalcname(takenodmgcalc, takenodmg)
            givenodmgcalc = dmgcalc.no_damage_to;
            dmgcalcname(givenodmgcalc, givenodmg)

            typeinfo = "```CSS\n[" + suffix[1] + "]"
            if (take2dmg.length > 0) {
                typeinfo += "\nTakes 200% from:\n" + take2dmg.join(", ")
            }
            if (takehalfdmg.length > 0) {
                typeinfo += "\nTakes 50% from:\n" + takehalfdmg.join(", ")
            }
            if (takenodmg.length > 0) {
                typeinfo += "\nTakes none from:\n" + takenodmg.join(", ")
            }
            if (givenodmg.length > 0) {
                typeinfo += "\nDeals none to:\n" + givenodmg.join(", ")
            }
            if (givehalfdmg.length > 0) {
                typeinfo += "\nDeals 50% to:\n" + givehalfdmg.join(", ")
            }
            if (give2dmg.length > 0) {
                typeinfo += "\nDeals 200% to:\n" + give2dmg.join(", ")
            }
            typeinfo += "\n\nPokemon with this type: " + x.pokemon.length
            typeinfo += "\n\nMoves with this type: " + x.moves.length
            typeinfo += "\n```"
            return msg.channel.sendMessage(typeinfo)
        case "move":
            moveinfo = "Name: " + x.name + "\n";
            if (x.accuracy) {
                moveinfo += "Accuracy: " + x.accuracy + "\n";
            }
            if (x.power) {
                moveinfo += "Power: " + x.power + "\n";
            }
            moveinfo += "PP: " + x.pp + "\n";
            moveinfo += "Type: " + x.type.name + "\n";
            moveinfo += "Class: " + x.damage_class.name + "\n";
            moveinfo += "Effect: " + x.effect_entries[0].short_effect + "\n";
            return msg.channel.sendMessage(moveinfo)


            //and so on
        default:
            return msg.channel.sendMessage('Case undefined.')

    }
}

function dmgcalcname(array, output) {
    for (i = 0; i < array.length; i++) {
        output.push("#" + array[i].name)
    }
}
