Scout.configure({ clientId: "eb415df5-c945-4ffa-a94e-4d6b8d4dc315" });
checkSearch("Ninja");

/*window.onload = function () {
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
}*/

function searchAttempt() {
    var input = document.getElementById('header-search-bar').value;
    console.log(input);
    checkSearch(input);
}

async function checkSearch(input) {
  try{
      let search = await Scout.players.search(input, "epic", null, "fortnite");
      let rslt = await search.results;
      index = -1;
      for(i = 0; i < rslt.length; i++){
        if(rslt[i].player.handle === input) { index = i; }
      }
      if(index != -1)
      {
        window.history.replaceState('', '',  "profile.html?player=" + input);
        renderScreenName(rslt[index].player.handle);
        await Scout.players.get("fortnite", search.results[index].player.playerId)
          .then(result => renderResult(result));
      }
  }
  catch(err) {
    console.log(err.message)
  }
}

function putVal(value, id){
  var element = document.getElementById(id);
  element.innerHTML = value;
}

fields = ['KILLS', 'SCORE', 'MATCHESPLAYED', 'PLACETOP1', 'PLACETOP3', 'PLACETOP6', 'PLACETOP12', 'PLACETOP25', 'KILLDEATHRATIO', 'WINRATE'];
function renderResult(result){
  console.log(result);
  statList = result.stats;
  var element = document.getElementById('stats-display-1');
  for (i = 0; i < fields.length/2; i++){
    putVal(statList[i].value, fields[i]);
  }
  element = document.getElementById('stats-display-2');
  for (i = fields.length/2; i < fields.length; i++){
    putVal(statList[i].value, fields[i]);
  }
}

function renderScreenName(name){
  putVal(name, 'screen-name');
}
