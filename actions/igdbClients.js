const igdbUrl = 'https://api-2445582011268.apicast.io/games/?fields=name,popularity,cover&order=popularity:desc&&filter[popularity][gt]=300&&limit=';
const apiGames = {};
const headers = {
    'user-key': '2e9edec754e59bf50699012d9f3c80e1'
}

apiGames.getGames = function (limit) {
    return fetch(igdbUrl + limit, {
        method: 'GET',
        headers: headers
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('URL games', data);
       return data.map((game, index) => {
            return {
                name: game.name,
                imgUrl: 'https:' + game.cover.url.replace('t_thumb','t_thumb_2x'),
                likes: index*10,
                comments: index*5
            }
        })
    });
};

export default apiGames;