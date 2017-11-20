import PagerService from '../../services/pager.service';

const RESULTS_PER_PAGE = [10, 50, 100, 250, 500];

class ResultsTableController {
    constructor($filter) {
        "ngInject";
        this._$filter = $filter;
    }

    $onInit() {
        this.searchQuery = '';
        this.pager = {};
        this.currentPage = 1;
        this.selectedLevel = '';
        this.pageSize = 10;
        this.resultsOptions = RESULTS_PER_PAGE;
        this.orders = {};
        this.setPage(this.currentPage);
    }

    getColumns(rows) {
        if (rows) {
            return Object.keys(rows[0]);
        }
        return [];
    }

    initOrders(columns) {
        for (let column of columns) {
            this.orders[column] = 0;
        }
    }

    $onChanges(changes) {
        this.pager = PagerService.getPager(this.totalPlayers, this.currentPage, this.pageSize, 6);
        if (this.orders && Object.keys(this.orders).length === 0) {
            this.initOrders(this.getColumns(this.rows));
        }
        // get levels only from the first response of this.rows
        if (!this.levels || this.levels.length === 0) {
            this.levels = this.getLevels(this.rows);
        }
    }

    setPageSize(pageSize) {
        this.pageSize = pageSize;
        this.setPage(1);
    }

    getLevels(list = []) {
        return Object.keys(list.reduce((prev, current) => {
                prev[current['level']] = true;
                return prev;
            },{}));
    }

    setPage(page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = PagerService.getPager(this.totalPlayers, page, this.pageSize, 6);
        this.currentPage = page;
        this.loadData();
    }

    clearOrders() {
        for (let column in this.orders) {
            this.orders[column] = 0;
        }
    }

    orderBy(key) {
        if (this.orders[key] === 1 || this.orders[key] === -1) {
            this.orders[key] *= -1;
        }
        else {
            this.orders[key] = 1;
        }
        this.rows = this._$filter('orderBy')(this.rows, this.orders[key] > 0 ? key : '-' + key);
    }

    loadData() {
        this.loadPlayers({
            start: this.pager.startIndex,
            n: this.pager.pageSize,
            search: this.searchQuery,
            level: this.selectedLevel
        });
    }
}

export default ResultsTableController;