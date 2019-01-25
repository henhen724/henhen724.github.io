const Scout = require('@scoutsdk/server-sdk')

async function main(){
// Note: We are assuming you are in an async context so we can utilize ES7 async/await. You can create an async context by simply wrapping your code in an async function and invoking the function as a promise.
await Scout.configure({
  clientId: require('./config/keys').ClientId,
  clientSecret: require('./config/keys').ClientSecret,
  scope: "public.read"
});

// Lets get the supported games or "titles", note we could also use Scout.titles.get(id)
let titles = await Scout.titles.list();
console.log(titles[2].platforms)
// Fortnite will be returned as one of the available titles
// Cool, but that information is not super useful on its own. What if we use the title
// ID to search for a player?
//
// Note that we are using fortnite.id here, but we could just as well use the string
// literal "fortnite", which is the "slug" for Fortnite.
// The second argument of the search method is the platform "slug" -- this comes
// in handy when a title supports multiple platforms (such as Epic, Xbox Live,
// and Playstation Network). This parameter can be left null, however you will have more
// success if you always include a value. Our search heuristics can cross reference
// gamertags and/or PSN IDs if they are in our system.
// The third parameter is the "console", which can be left null, or specified if needed.
// It is specified here for completeness. If you wanted to get the Xbox profile for a
// Fortnite player using their Epic username, you would use "epic" as the platform, and
// "xb1" (Xbox One) as the console.
// The final two boolean parameters are "comprehensive" and "exact" respectively.
// Enabling "comprehensive" means we will search deeper for a matching persona, instead
// of only looking through our database of known players. We recommend disabling
// comprehensive search only when you would like to provide typeahead support.
// "exact" is a filtering mechanism. When it is enabled, only results with an explicit
// match (case-insensitive) to the provided identifier will be returned.
let search = await Scout.players.search("henhen724", "battlenet", "pc", titles.find(t => t.slug === "destiny2").id, true, true);
console.log(search);
// Okay, now we have a list of zero or more results. In this case, it is probably an
// exact match. And we know Ninja plays Fortnite under this username, so we can assume
// that this search result exists.
// let ninjasId = search.results[0].player.playerId;

/*Scout.verification.request('45ecfaf7-4858-4d29-9ab5-b83524e4ad4c', 'localhost:5000/link/returnscout', '')
    .then(url => console.log(url))
    .catch(err => console.log(err));
*/
// Okay, get his stats!
// let ninja = await Scout.players.get(fortnite.id, ninjasId, "*");

// console.log(ninja);
}

main();