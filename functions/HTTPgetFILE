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
