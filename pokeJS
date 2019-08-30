function pokelookup (suffix){
suffix = suffix.split(" ")
switch(suffix[0])
{
case "pokemon":
case "ability":
case "type":
case "move":
case "item":
break;
default: suffix="error";return console.log(suffix) 
}
path = suffix.join("/")
console.log(path)
const READYSTATE = 3
const Http = new XMLHttpRequest();
const url = `https://pokeapi.co/api/v2/${path}`;
y=[]

var X = 0
var x
Http.open("GET", url);
Http.setRequestHeader(`Authorization`, `The big gay`)
Http.send();
Http.onreadystatechange = (e) => {
    X++
y.push(Http.responseText)
    console.log(y.length)
    if (X == READYSTATE) {
        if(Http.responseText=='Not Found') return console.log(Http.responseText)
       x = JSON.parse(Http.responseText)
        switch(suffix[0]){
        case "pokemon":
        
          console.log('Pokedex ID: '+x.id)
          console.log('name: '+ x.species.name)
          console.log('weight: '+x.weight/10+" kg")
          if(x.height<=9)
          {console.log('height: '+x.height*10+" cm")}
          else console.log('height: '+x.height/10+" m")
        break;
    case "item":
        console.log(x.name)
        console.log(x.effect_entries[0].effect.split("\n").join(" "))
    break;
    //and so on
    
    
    }
    }
}}
