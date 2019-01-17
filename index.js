fields = {'KILLS':1, 'SCORE':2, 'MATCHESPLAYED':2, 'PLACETOP1':3, 'PLACETOP3':4, 'PLACETOP6':5, 'PLACETOP12':6, 'PLACETOP25':7, 'KILLDEATHRATIO':8, 'WINRATE':9};
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
    window.history.replaceState('', '',  "index.html?player=" + input);
    console.log(input);
    checkSearch(input)
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
        renderScreenName(rslt[index].player.handle);
        await Scout.players.get("fortnite", search.results[index].player.playerId)
          .then(result => renderResult(result));
      }
  }
  catch(err) {
    console.log(err.message)
  }
}
function renderResult(result){
  console.log(result);
  statList = result.stats;
  $("#stats-display").empty();
  var element = document.getElementById('stats-display-1');
  for (i = 0; i < fields.length; i++){
    statList[fields[]].metadata.key.toUpperCase()
    par2.appendChild(document.createTextNode(statList[i].displayValue));
    liElem.appendChild(par1);
    liElem.appendChild(par2);
    element.appendChild(liElem);
  }
}
function putVal(value, id){
  document.getElementById(id).;
}

function renderScreenName(name){
  var element = document.getElementById('screen-name');
  element.appendChild(document.createTextNode(name))
}
