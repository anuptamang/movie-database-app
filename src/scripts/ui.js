export default class Movie {
    constructor() {
        this.latestHolder = document.querySelector('[data-latest]');
        this.byRatingHolder = document.querySelector('[data-by-rating]');
        this.detailsHolder = document.querySelector('[data-details]');
    }

    getLatestMovies(movies, moviesHolder) {
        let output = '';
        for (let movie of movies) {
            output += `
                <div class="col-md-3 mb-4">
                    <a href="src/pages/movie/?${movie.title}" class="card mb-2 product-card" data-show-detail data-id="${movie.id}">
                        <img
                        class="img-responsive"
                        src="${movie.medium_cover_image}"
                        alt="${movie.title_long}"
                        />
                        <div class="overlay-info">
                        <div class="wrap">
                            <div class="h5 rating mb-2">
                            <i class="fas fa-star d-block mb-1 text-success"></i>
                            ${movie.rating}/10
                            </div>
                            <div class="h4 genre mb-4">
                             ${this.showItems(movie.genres)}
                            </div>
                            <span class="btn btn-info">View Details</span>
                        </div>
                        </div>
                    </a>
                    <h5 class="text-white">
                        <a href="#" class="text-reset">${movie.title}</a>
                    </h5>
                    <p class="text-info">${movie.year}</p>
                </div>
             `;
        }

        if (moviesHolder != null) {
            moviesHolder.innerHTML = output;
        }
    }

    getMovieDetails(movie, moviesHolder) {
        let output = '';
        output += `
        <div class="row">
            <div class="col-md-3 mb-4">
                <a href="#" class="card mb-2 product-card" data-id="${movie.id}">
                    <img
                    class="img-responsive"
                    src="${movie.medium_cover_image}"
                    alt="${movie.title_long}"
                    />
                </a>
            </div>
            <div class="col-md-9 px-4">
                <h1 class="text-white mb-3">${movie.title}</h1>
                <h4 class="text-white">${movie.year}</h4>
                <h4 class="text-white">${this.showItems(movie.genres)}</h4>
            </div>
        </div>
            `;

        if (moviesHolder != null) {
            moviesHolder.innerHTML = output;
        }
    }

    showItems(items) {
        let result = "";

        for (let item of items) {
            result += item + ' ';
        }

        return result;
    }
}