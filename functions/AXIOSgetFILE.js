function getFILE (url,suffix) {
axios.get(url)
  .then(function (response) {
    
    //success
    x=response.data
    //console.log(JSON.stringify(x))
    console.log(pokeparse(suffix, x, msg))
    
  })
  .catch(function (error) {
    //failure
    console.log(error);
  })

    
    }
