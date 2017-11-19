import 'whatwg-fetch'

const API_URL = 'http://localhost:1337/localhost:20000/api/v1';
// const API_URL = 'http://localhost:20000/api/v1';

function getApiUrl(path) {
    return `${API_URL}/${path}`
}

class Tournament {
    constructor($http, $q) {
        "ngInject";
        this._$http = $http;
        this._$q = $q;
    }

    getTournamentResults(start = 0, n = 100, search, level) {
        return this._$q.all([this.getPlayers(start, n, search, level), this.getSuspectedPlayers()])
            .then(responses => {
                const players = this.markSuspects(responses[0].data, responses[1]);
                return {
                    players,
                    total: parseInt(responses[0].headers('x-total'))
                };
            });
    }

    getPlayers(start = 0, n = 100, search, level) {
        let URL = getApiUrl(`players?start=${start}&n=${n}`);
        if (search && typeof search === 'string') {
            URL += '&search=' + search;
        }
        if (level && typeof level === 'string') {
            URL += '&level=' + level.toLowerCase();
        }
        return this._$http.get(URL)
            .then(response => {
                return response;
            })
            .catch(e => {
                console.error(e);
            });
    }

    getSuspectedPlayers() {
        const URL = getApiUrl(`players/suspects`);
        return this._$http.get(URL)
            .then(response => response.data)
            .catch(e => {
                console.error(e);
            });
    }

    markSuspects(players = [], suspects = []) {
        return Array.from(players.map(player => {
            player.isSuspect = suspects.indexOf(player.id) > -1;
            return player;
        }));
    }
}

export default Tournament;