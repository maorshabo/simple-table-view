import range from 'lodash';

class PagerService {
    static getPager(totalItems, currentPage, pageSize, maxPagesToShow = 10) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        let half = Math.ceil(maxPagesToShow / 2);
        let startPage, endPage;
        if (totalPages <= maxPagesToShow) {
            // less than @maxPagesToShow total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= half + 1) {
                startPage = 1;
                endPage = maxPagesToShow;
            }
            // right edge
            else if (currentPage + half >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - half;
                endPage = currentPage + half - 1;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let idx = startPage;
        const arraySize = endPage > maxPagesToShow ? maxPagesToShow : endPage;
        let pages = Array(arraySize).fill(0).map(i => idx++);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}

export default PagerService;