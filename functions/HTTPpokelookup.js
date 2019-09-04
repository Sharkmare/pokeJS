function pokelookup (suffix){
suffix = suffix.toLowerCase()
suffix = suffix.split(" ")
pokeValidate(suffix[0])

path = suffix[0]+"/"+suffix[1] //changed to hard coding suff 1 and 0 to accomedate langaugee suffix 2
console.log (path)
if (suffix[2])console.log("Language selection: " +suffix[2])
else console.log("No language token defaulting to english")
const msg = null
const Http = new XMLHttpRequest()
const url = `https://pokeapi.co/api/v2/${path}`
var x;
var array;
getFILE(url,Http,x,suffix)


}
