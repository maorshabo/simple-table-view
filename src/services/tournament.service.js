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
        this.suspectedUsers = [];
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
            start = 0;
            URL = getApiUrl(`players?start=${start}&n=${n}&search=${search}`);
            if (level && typeof level === 'string') {
                URL += '&level=' + level.toLowerCase();
            }
        }
        else if (level && typeof level === 'string') {
            start = 0;
            URL = getApiUrl(`players?start=${start}&n=${n}&level=${level.toLowerCase()}`);
        }
        return this._$http.get(URL)
            .catch(e => {
                console.error(e);
            });
    }

    getSuspectedPlayers() {
        const URL = getApiUrl(`players/suspects`);
        if (this.suspectedUsers.length > 0) {
            return this._$q.resolve(this.suspectedUsers);
        }
        return this._$http.get(URL)
            .then(response => {
                this.suspectedUsers = response.data;
                return response.data;
            })
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