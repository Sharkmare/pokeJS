Commands.pokedex = {
  name: 'pokedex',
  hidden:true,
  help: '',
  usage: 'pokemon/item [pokemon/item]',
  noDM: false,
  level: 0,
fn: function (msg,suffix) {
	var dir = "G:/resources/"
	suffix = suffix.split(" ")
	switch(suffix[0])
	{
	case "pokemon":
	case "ability":
	case "type":
	case "move":
	case "item":
	break;
	default: suffix="error";return msg.channel.sendMessage(suffix)
	}
	path = suffix.join("/")
	
	console.log(path);
	  if (!fs.existsSync(dir+path))
	  {pokelookup(suffix,msg,dir)}
	else {
		var result=[];
		fs.readFile(dir+path, 'utf8', function (err,x) {
			if (err) {return console.log(err);}
				x = JSON.parse(x)
				switch(suffix[0]){
					case "pokemon":
					result.push('Pokedex ID: '+x.id); result.push('name: '+ x.species.name); result.push('weight: '+x.weight/10+" kg");
					if(x.height<=9) {result.push('height: '+x.height*10+" cm")}
					else result.push('height: '+x.height/10+" m")
					return msg.channel.sendMessage(result.join("\n"))
					case "item":
					result.push(x.name)
					result.push(x.effect_entries[0].effect.split("\n").join(" "))
					return msg.channel.sendMessage(result.join("\n"))
    //and so on
					default: return msg.channel.sendMessage('Case undefined.')
				
				
				}
	})
	
	
	
	
	
}}}




function pokelookup (suffix,msg,dir){
	var result=[];
path = suffix.join("/")
console.log(path)
const READYSTATE = 4
const Http = new XMLHttpRequest();
const url = `https://pokeapi.co/api/v2/${path}`;
y=[]

var x;
Http.open("GET", url);
Http.setRequestHeader(`Authorization`, `The big gay`)
Http.send();
Http.onreadystatechange = (e) => {
    if (Http.readyState == READYSTATE) {
        if(Http.responseText=='Not Found') return "Not Found";
       x = JSON.parse(Http.responseText)
	     fs.writeFile(dir+path, Http.responseText , function(err) {
				if(err) {return console.log(err);}
			  console.log(path+" has been logged");
			})
	   
	   
        switch(suffix[0]){
        case "pokemon":
          result.push('Pokedex ID: '+x.id)
          result.push('name: '+ x.species.name)
          result.push('weight: '+x.weight/10+" kg")
          if(x.height<=9)
          {result.push('height: '+x.height*10+" cm")}
          else result.push('height: '+x.height/10+" m")
		  return msg.channel.sendMessage(result.join("\n"))
        break;
    case "item":
        result.push(x.name)
        result.push(x.effect_entries[0].effect.split("\n").join(" "))
		return msg.channel.sendMessage(result.join("\n"))
    break;
    //and so on
    default: return msg.channel.sendMessage('Case undefined.')
    
    }
    }
}

}
