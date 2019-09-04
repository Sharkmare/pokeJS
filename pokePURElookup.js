let suffix = "pokemon-species blaziken ja"
//suffix is used to provide input arguments for testing

pokelookup(suffix)
function pokelookup (suffix){
suffix = suffix.toLowerCase()
suffix = suffix.split(" ")
pokeValidate(suffix[0])

path = suffix[0]+"/"+suffix[1] //changed to hard coding suff 1 and 0 to accomedate langaugee suffix 2
console.log (path)

const msg = null
const Http = new XMLHttpRequest()
const url = `https://pokeapi.co/api/v2/${path}`
var x;
var array;
getFILE(url,Http,x,suffix)


}
    
function getJSON(x) {return JSON.parse(x)}
function randomIntFromInterval(min, max) {return Math.floor(Math.random() * (max - min + 1) + min)}

function getFILE (url,Http,x,suffix) {
Http.open("GET", url);
Http.setRequestHeader(`Authorization`, `Bot XXXX`)
Http.send();
Http.onreadystatechange = (e) => {
  
      if (Http.readyState == 4) {
      if(Http.responseText=='Not Found') return(Http.responseText)
      //Writefile blablabla path, placeholder
       x=getJSON(Http.responseText)
       console.log(pokeparse(suffix, x, msg))

    }}}

function pokeValidate(string) {
switch(string)
{
case "pokemon":
case "ability":
case "type":
case "move":
case "item":
case "pokemon-species":
break;
default: suffix="error"; return suffix
}}

function pokeparse(suffix, x, msg) {
    var result = [];
    switch (suffix[0]) {
        case "pokemon-species":
            entries = x.flavor_text_entries
            //console.log(entries)
            if(suffix[2]){entries = entries.filter(d => d.language.name == suffix[2])}
            else {entries = entries.filter(d => d.language.name == 'en')}
            if(entries.length <= 0) {return "No entries found for given language token "+suffix[2]}

            entry=randomIntFromInterval(0, entries.length)
            return(entries[entry].flavor_text)
            
        case "pokemon":
            result.push('Pokedex ID: ' + x.id)
            result.push('name: ' + x.species.name)
            result.push('weight: ' + x.weight / 10 + " kg")
            if (x.height <= 9) {
                result.push('height: ' + x.height * 10 + " cm")
            } else result.push('height: ' + x.height / 10 + " m")
            return(result.join("\n"))
            break;
        case "item":
            result.push(x.name)
            result.push(x.effect_entries[0].effect.split("\n").join(" "))
            return(result.join("\n"))

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
            return(typeinfo)
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
            return(moveinfo)


            //and so on
        default:
            return ('Case undefined.')

    }
}

function dmgcalcname(array, output) {
    for (i = 0; i < array.length; i++) {
        output.push("#" + array[i].name)
    }}

function filter(json,value) {
  result = json.filter(d => d == value)
  return result
}
