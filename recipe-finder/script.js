const MY_HOST = 'tasty.p.rapidapi.com';
const MY_KEY = '62672eae58mshea9da94cde31322p18444djsnc441e03489c3';
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
        fetchRecipes(query);
    } else {
        alert('Please enter a search term.');
    }
});

async function fetchRecipes(query) {
    const url = https://${API_HOST}/recipes/list?from=0&size=10&q=${query};
    const options = {
        headers: {
            'X-RapidAPI-Host': MY_HOST,
            'X-RapidAPI-Key': MY_KEY,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

const searchRecipes = async (query) => {
    const url = https://tasty.p.rapidapi.com/recipes/list?q=${query}&from=0&size=10;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "your-rapidapi-key",
                "X-RapidAPI-Host": "tasty.p.rapidapi.com"
            }
        });

        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Unable to fetch recipes. Please try again later.");
    }
};

const displaySearchResults = (recipes) => {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="result-card">
                <img src="${recipe.thumbnail_url}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <button onclick="getRecipeDetails(${recipe.id})">View Details</button>
            </div>
        `;
        resultsContainer.innerHTML += recipeCard;
    });
};

// Event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value.trim();
    if (query) {
        searchRecipes(query);
    } else {
        alert("Please enter a search term.");
    }
});

const getRecipeDetails = async (id) => {
    const url = https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id};

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "62672eae58mshea9da94cde31322p18444djsnc441e03489c3",
                "X-RapidAPI-Host": "tasty.p.rapidapi.com"
            }
        });

        const recipe = await response.json();
        displayRecipeDetails(recipe);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        alert("Unable to fetch recipe details. Please try again later.");
    }
};

const displayRecipeDetails = (recipe) => {
    const detailsContainer = document.getElementById("recipe-details");
    detailsContainer.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.thumbnail_url}" alt="${recipe.name}">
        <h3>Ingredients</h3>
        <ul>
            ${recipe.sections[0].components.map(component => <li>${component.raw_text}</li>).join("")}
        </ul>
        <h3>Instructions</h3>
        <ol>
            ${recipe.instructions.map(instruction => <li>${instruction.display_text}</li>).join("")}
        </ol>
    `;

    // Scroll to the details section
    detailsContainer.scrollIntoView({ behavior: "smooth" });
};


function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results.

    if (recipes && recipes.length > 0) {
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <img src="${recipe.thumbnail_url}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p><a href="${recipe.original_video_url || '#'}" target="_blank">View Recipe</a></p>
            `;
            resultsDiv.appendChild(card);
        });
    } else {
        resultsDiv.innerHTML = '<p>No recipes found. Please try another search.</p>';
    }
}