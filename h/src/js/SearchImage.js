

const accessKey = "hKU2dCC8zb74uGOl3W2Qw2rrgfq8XMBCqHrzMMgJgYQ";
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("showMoreBtn");


let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.forEach((result) => {
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imgWrapper.appendChild(image);
            imgWrapper.appendChild(imageLink);
            searchResults.appendChild(imgWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
