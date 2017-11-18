import 'whatwg-fetch'

const API_URL = 'http://localhost:20000/api/v1';

const MOCK = [{"name": "almeida", "level": "rookie", "score": 3, "id": 0}, {
    "name": "bose",
    "level": "pro",
    "score": 65,
    "id": 1
}, {"name": "allen", "level": "pro", "score": 22, "id": 2}, {
    "name": "brahmagupta",
    "level": "rookie",
    "score": 2,
    "id": 3
}, {"name": "carson", "level": "amateur", "score": 49, "id": 4}, {
    "name": "benz",
    "level": "amateur",
    "score": 85,
    "id": 5
}, {"name": "benz", "level": "rookie", "score": 118, "id": 6}, {
    "name": "borg",
    "level": "rookie",
    "score": 54,
    "id": 7
}, {"name": "shannon", "level": "rookie", "score": 123, "id": 8}, {
    "name": "bhabha",
    "level": "pro",
    "score": 105,
    "id": 9
}];
const SUSPECTS = [29, 63, 91, 94, 110, 140, 163, 167, 178, 181, 204, 226, 241, 248, 262, 268, 281, 284, 291, 292, 293, 302, 332, 353, 383, 386, 388, 395, 399, 415, 416, 430, 453, 460, 461, 475, 482, 485, 486, 487, 491, 504, 515, 529, 538, 548, 550, 552, 557, 579, 598, 625, 626, 628, 634, 641, 642, 643, 656, 657, 670, 681, 682, 687, 689, 711, 717, 735, 746, 753, 760, 779, 782, 787, 789, 806, 810, 827, 850, 856, 859, 865, 880, 896, 897, 902, 909, 928, 932, 938, 941, 974, 985, 1002, 1007, 1015, 1038, 1042, 1043, 1068, 1069, 1074, 1075, 1084, 1091, 1108, 1123, 1125, 1127, 1133, 1137, 1146, 1147, 1151, 1155, 1173, 1189, 1195, 1230, 1236, 1244, 1261, 1270, 1277, 1291, 1306, 1309, 1339, 1352, 1355, 1378, 1388, 1393, 1395, 1401, 1405, 1424, 1443, 1480, 1486, 1510, 1516, 1529, 1538, 1539, 1554, 1563, 1568, 1611, 1629, 1641, 1643, 1645, 1649, 1665, 1675, 1680, 1681, 1688, 1699, 1710, 1744, 1751, 1754, 1756, 1761, 1772, 1778, 1794, 1795, 1797, 1802, 1808, 1810, 1826, 1832, 1843, 1855, 1859, 1860, 1871, 1878, 1884, 1903, 1946, 1966, 1969, 1971, 1984, 1988];

function getApiUrl(path) {
    return `${API_URL}/${path}`
}

class Tournament {
    constructor($http, $q) {
        "ngInject";
        this._$http = $http;
        this._$q = $q;
    }

    getPlayers(start = 0, n = 100) {
        const URL = getApiUrl(`players?start=${start}&n=${n}`);
        /*return fetch(URL)
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.error(e);
            });*/
        return this._$q.all([MOCK, this.getSuspectedPlayers()])
            .then(responses => {
                return this.markSuspects(responses[0], responses[1]);
            });
    }

    getSuspectedPlayers() {
        const URL = getApiUrl(`players/suspects`);
        return Promise.resolve(SUSPECTS)
        /*return this._$http.get(URL)
            .then(r => r.json())
            .then(response => {

            })
            .catch(e => {
                console.error(e);
            });*/
    }

    markSuspects(players = [], suspects = []) {
        return Array.from(players.map(player => {
            player.isSuspect = suspects.indexOf(player.id) > -1;
            return player;
        }));
    }
}

export default Tournament;