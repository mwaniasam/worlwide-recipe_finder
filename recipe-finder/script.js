const MY_HOST = 'tasty.p.rapidapi.com';
const MY_KEY = '62672eae58mshea9da94cde31322p18444djsnc441e03489c3';

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
        fetchRecipes(query);
    } else {
        alert('Please enter a search term.');
    }
});

// Function to fetch recipes based on a search query
async function fetchRecipes(query) {
    const url = `https://${MY_HOST}/recipes/list?from=0&size=10&q=${query}`;
    const options = {
        headers: {
            'X-RapidAPI-Host': MY_HOST,
            'X-RapidAPI-Key': MY_KEY,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

// Function to display search results
function displaySearchResults(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (recipes && recipes.length > 0) {
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'result-card';
            recipeCard.innerHTML = `
                <img src="${recipe.thumbnail_url}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <button onclick="viewRecipeDetails(${recipe.id})">View Details</button>
            `;
            resultsContainer.appendChild(recipeCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No recipes found. Please try another search.</p>';
    }
}

// Function to redirect to details.html with the recipe ID
function viewRecipeDetails(recipeId) {
    window.location.href = `details.html?id=${recipeId}`;
}