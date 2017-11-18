class AppCtrl {
    constructor(TournamentService) {
        "ngInject";
        this._tournamentService = TournamentService;
        this.players = [];
    }

    $onInit() {
        this.loadPlayers();
    }

    loadPlayers() {
        this._tournamentService.getPlayers()
            .then(players => {
                this.players = players;
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default AppCtrl;