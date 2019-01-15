Scout.configure({ clientId: "eb415df5-c945-4ffa-a94e-4d6b8d4dc315" }).then(() => {});
Scout.titles.list().then(titles => console.log(titles));


window.onload = function () {
    var url = document.location.href;
    try{
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
          tmp = params[i].split('=');
          data[tmp[0]] = tmp[1];
        }
        document.getElementById('here').innerHTML = data.player;
    }
    catch(err) {
      if(err.message === "Cannot read property 'split' of undefined"){
        console.log('No query')
      }
      else {
        console.log(err.message)
      }
    }
}

function searchAttempt() {
    var input = document.getElementById('header-search-bar').value;
    var firstUri = window.location.href;
    window.history.replaceState('', '',  "index.html?player=" + input);
    console.log(input);
}
