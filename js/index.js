let myList = [];
new Splide('#movie-slider', {
    type: 'loop',
    padding: '15%',
    gap: '20px',
}).mount();


new Splide('#watch-slider', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 6,
    gap: '15px',
    arrows: true,
    pagination: true,
  breakpoints: {
        768: {
            perPage: 3,
        },

        480: {
            perPage: 2,
        }
    },

    autoScroll: {
        speed: 1,
    },
}).mount(window.splide.Extensions);

var main = new Splide('#top-rated', {
    type: 'slide',
    arrows: true,
    pagination: false,
    perPage: 1,

    breakpoints: {
        350: {
            drag: false,
        },
    },
});

main.mount();


var pictures1 = new Splide('#pictures-1', {
    type: 'slide',
    perPage: 4,
    gap: '15px',
    arrows: true,
    pagination: false,
    drag: true,

    breakpoints: {
        768: {
            perPage: 3,
        },
        480: {
            perPage: 2,
        }
    },
});

pictures1.mount();


var pictures2 = new Splide('#pictures-2', {
    type: 'slide',
    perPage: 4,
    gap: '15px',
    arrows: true,
    pagination: false,
    drag: true,

    breakpoints: {
        768: {
            perPage: 3,
        },
        480: {
            perPage: 2,
        }
    },
});

pictures2.mount();


var pictures3 = new Splide('#pictures-3', {
    type: 'slide',
    perPage: 4,
    gap: '15px',
    arrows: true,
    pagination: false,
    drag: true,

    breakpoints: {
        768: {
            perPage: 3,
        },
        480: {
            perPage: 2,
        }
    },
});

pictures3.mount();

const API_KEY = "0e463bac379fba828dd2b93583c737f0";
const BASE_URL = "https://api.themoviedb.org/3";

fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {

        console.log("DATA:", data);

        let movies = data.results;

        console.log("MOVIES:", movies);

        let trendList = document.querySelector("#trend-list");

        console.log("TREND LIST:", trendList);

        movies.forEach(movie => {

            let title = movie.title;
            let rating = movie.vote_average;
            let poster = movie.poster_path;

            let imageUrl =
                `https://image.tmdb.org/t/p/w500${poster}`;

            let li = document.createElement("li");

            li.classList.add("splide__slide");

            li.innerHTML = `

                <div class="trend-card">

                    <div class="trend-img">

                        <img 
                            src="${imageUrl}" 
                            alt="${title}" 
                            class="img-fluid"
                        >

                    </div>

                    <div class="layout">

                        <div class="item text-center text-light">

                            <div class="movie-info text-center mt-3 thirdColor">

                                <span>
                                    <i class="fa-solid fa-clapperboard"></i>
                                    ${title}
                                </span>

                                <span>

                                    <i class="fa-solid fa-star"
                                       style="color: rgb(255, 252, 18);">
                                    </i>

                                    ${rating.toFixed(1)}

                                </span>

                            </div>

                            <div class="watch thirdColor">

                                <a href="#">

                                    <i class="hgi hgi-stroke hgi-rounded hgi-play-circle-02 me-2 text-light">
                                    </i>

                                    <span class="thirdColor">
                                        Watch Trailer
                                    </span>

                                </a>

                            </div>

                        </div>

                    </div>

                    <a href="#" class="icon">

                        <i class="fa-solid fa-folder-plus fa-shake"></i>

                    </a>

                </div>

            `;

            trendList.append(li);

        });


        // هنا الـ 20 فيلم بقوا موجودين بالفعل
        let Trending = new Splide('#Trend', {

            type: 'loop',
            autoWidth: true,
            gap: '20px',
            arrows: true,
            pagination: true,

        });

        Trending.mount();

    })
    .catch(error => {
        console.log("ERROR:", error);
    });
function openSignin() {
    $(".signin").fadeIn(400);
}

function openLogin() {
    $(".login").fadeIn(400);
}
function openList() {
    $(".mylist").fadeIn(400);
    displayMyList();
}
function closePopup() {
    $(".popup").fadeOut(400);
}

$(".popup").click(function () {
    $(this).fadeOut(400);
});

$(".box").click(function (event) {
    event.stopPropagation();
});

setTimeout(function () {
    document.querySelector(".loading").classList.add("hide");
}, 5000);
function toggleMyList(button, movieTitle) {

    if (!myList.includes(movieTitle)) {

       
        myList.push(movieTitle);

        button.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <span>Added to List</span>
        `;

    } else {

        
        myList = myList.filter(function(movie) {
            return movie !== movieTitle;
        });

        button.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            <span>My list</span>
        `;
    }

  
    displayMyList();
}


function displayMyList() {

    let container = document.querySelector("#my-list-container");

    container.innerHTML = "";

    if (myList.length === 0) {
        container.innerHTML = `
            <p class="text-light text-center">
                Your list is empty.
            </p>
        `;
        return;
    }

    myList.forEach(function(movie) {

        container.innerHTML += `
            <div class="card mb-3 p-3">
                <h5>${movie}</h5>

                <button 
                    type="button" 
                    class="btn btn-danger"
                    onclick="removeFromList('${movie}')">
                    REMOVE
                </button>
            </div>
        `;

    });
}
function removeFromList(movieTitle) {

    myList = myList.filter(function(movie) {
        return movie !== movieTitle;
    });

    displayMyList();
}






