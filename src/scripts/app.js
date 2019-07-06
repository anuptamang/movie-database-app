import '../styles/main.scss';

import Movie from './ui';
import Search from './search';
import Api from './api/api';

const movieLab = new Movie();
const getSearch = new Search();
const getApi = new Api();

document.addEventListener('DOMContentLoaded', function () {
    let movies;
    if (localStorage.getItem('movies') === null) {
        movies = [];
    } else {
        movies = JSON.parse(localStorage.getItem('movies'));
        getDetails(movies);
    }
});

getSearch.hideDropDownOnClickOutside();

getApi.getData('https://yts.lt/api/v2/list_movies.json?limit=50')
    .then(data => {
        const movies = data.data.movies;
        const latestMovies = movies.filter(movie => movie.year > 2017).slice(0, 4);
        const moviesByRating = movies.filter(movie => movie.rating > 7);

        movieLab.getLatestMovies(latestMovies, movieLab.latestHolder);
        movieLab.getLatestMovies(moviesByRating, movieLab.byRatingHolder);

        const movieInfo = movies.map(movie => ({ "id": movie.id, "title": movie.title, "year": movie.year }));

        getSearch.searchInput.addEventListener('keyup', function (e) {
            let searchInput = e.target.value.toLowerCase();
            let resultTitles = [];

            for (let titleYears of movieInfo) {
                if (titleYears.title.toLowerCase().indexOf(searchInput) != -1 && searchInput.length > 0) {
                    resultTitles.push(titleYears);

                    getSearch.showSearchResults(resultTitles, getSearch.resultsHolder);
                    getSearch.resultsHolder.classList.add('d-block');
                }
            }

            if (resultTitles.length < 1) {
                getSearch.resultsHolder.classList.remove('d-block');
                getSearch.showSearchResults(resultTitles, getSearch.resultsHolder);
            }
        });
    });

const waitForMovies = setTimeout(() => {
    let movieCard = document.querySelectorAll('.product-card');
    getMoviesLoaded(movieCard);
}, 2000);

function getMoviesLoaded(movieCard) {
    for (let card of movieCard) {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.closest('.product-card').dataset.id;
            const url = e.target.closest('.product-card').getAttribute('href');
            storeMovieInLocalStorage(id);
            getDetails(id);
            location.assign(`${url}`);
        });
    }
}

function getDetails(id) {
    getApi.getData(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`)
        .then(data => {
            const movieInfo = data.data.movie;
            movieLab.getMovieDetails(movieInfo, movieLab.detailsHolder);
        })
}

function storeMovieInLocalStorage(movie) {
    let movies;

    if (localStorage.getItem('movies') === null) {
        movies = [];
    } else {
        movies = JSON.parse(localStorage.getItem('movies'));
    }

    movies.pop(movie);
    movies.push(movie);

    localStorage.setItem('movies', JSON.stringify(movies));
}

document.querySelector('.dropdown-menu').addEventListener('click', function (e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const url = e.target.getAttribute('href');
    storeMovieInLocalStorage(id);
    getDetails(id);
    location.assign(`${url}`);
})