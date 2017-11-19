class AppCtrl {
    constructor(TournamentService) {
        "ngInject";
        this._tournamentService = TournamentService;
        this.players = [];
    }

    $onInit() {
        this.totalPlayers = 0;
    }

    loadPlayers(start, n, search, level) {
        return this._tournamentService.getTournamentResults(start, n, search, level)
            .then(response => {
                this.players = response.players;
                this.totalPlayers = response.total;
                return this.players;
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default AppCtrl;