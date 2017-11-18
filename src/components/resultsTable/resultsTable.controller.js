class ResultsTableController {
    constructor() {
        "ngInject";
    }

    $onInit() {
        this.searchQuery = '';
        this.rawRows = this.rows.slice();
    }
}

export default ResultsTableController;