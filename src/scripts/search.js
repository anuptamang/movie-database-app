import Movie from './ui';

class Search extends Movie {
    constructor() {
        super();
        this.page = document.querySelector('body');
        this.searchForm = document.querySelector('.search-form');
        this.searchInput = document.querySelector('.search-input');
        this.resultsHolder = document.querySelector('[data-search-results]');
    }

    showSearchResults(results, resultsHolder) {
        let output = '';
        if (results.length > 0) {
            for (let item of results) {
                output += `
                <a href="src/pages/movie/?${item.title}" target="_blank" class="btn btn-primary btn-block text-capitalize my-1" data-id="${item.id}">${item.title} ${item.year}</a>
            `;
            }
        }

        resultsHolder.innerHTML = output;
    }

    hideDropDownOnClickOutside() {
        this.page.addEventListener('click', (e) => {
            if (e.target !== this.resultsHolder && e.target !== this.searchForm) {
                this.resultsHolder.classList.remove('d-block')
            }
        })
    }
}

export default Search;