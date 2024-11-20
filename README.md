# worlwide-recipe_finder

Worldwide Recipe Finder
Hi there! Welcome to the Worldwide Recipe Finder, a project I built to explore and practice working with APIs, responsive design, and deployment on a load-balanced server setup. This web application allows users to search for recipes from all over the world, view detailed instructions, and discover new cooking ideas.

Table of Contents
Introduction
Features
Installation and Setup
How to Use
Deployment Process
Understanding the Code
APIs Used
Lessons Learned
Future Improvements
Credits

1. Introduction
The Worldwide Recipe Finder is a simple and beginner-friendly web application. It’s designed to:
Help users find recipes by ingredients, tags, or names.
Display recipe details like ingredients and instructions in an easy-to-read format.
Serve as a practical example of integrating APIs with frontend development and deploying on a load-balanced server setup.

2. Features
Search Recipes: Search by keywords, ingredients, or tags and get relevant results.
View Details: Click on a recipe to view cooking steps and ingredient lists.
Responsive Design: Works on both desktop and mobile devices.
Scalable Deployment: Deployed on two web servers with a load balancer to handle traffic efficiently.

3. Installation and Setup
Local Setup
Clone the Repository:
bash
Copy code
git clone https://github.com/mwaniasam/worldwide-recipe_finder.git
cd worldwide-recipe-finder


Get an API Key:
Sign up on RapidAPI and subscribe to the Tasty API.
Copy the API key provided.
Set the API Key:
Open the script.js file and replace "your-rapidapi-key" with your actual API key.
Run Locally:
Open index.html in your browser to start using the app.

4. How to Use
Search Recipes:
Enter a keyword (like "pasta" or "chicken") in the search bar.
Click "Search" to see a list of recipe options.
View Details:
Click the "View Details" button on any recipe to see cooking instructions and ingredients.
On Mobile:
The app adjusts perfectly for mobile screens, so you can use it anywhere!

5. Deployment Process
I deployed the app on three servers:
Web-01 and Web-02 are the main web servers.
Lb-01 is the load balancer, ensuring traffic is distributed evenly.
Steps for Deployment:
Upload Files to Servers:
bash
Copy code
scp -r . user@web-01-ip:/var/www/html/
scp -r . user@web-02-ip:/var/www/html/


Set Up Nginx on Web Servers:
Install Nginx: sudo apt install nginx -y
Configure it to serve the app from /var/www/html.
Set Up the Load Balancer:
Configure Nginx to forward traffic to Web-01 and Web-02:
nginx
Copy code
upstream recipe_finder {
    server web-01-ip;
    server web-02-ip;
}

server {
    listen 80;
    server_name lb-01-ip;

    location / {
        proxy_pass http://recipe_finder;
    }
}


Restart Nginx: sudo systemctl restart nginx.
Test Deployment:
Open http://lb-01-ip in your browser to verify the app works as expected.

6. Understanding the Code
Search Functionality:
Users input a keyword, and the app makes an API call to fetch recipes.
Example Code:
javascript
Copy code
const searchRecipes = async (query) => {
    const url = `https://tasty.p.rapidapi.com/recipes/list?q=${query}&from=0&size=10`;
    const response = await fetch(url, { headers: { "X-RapidAPI-Key": "your-rapidapi-key" } });
    const data = await response.json();
    displaySearchResults(data.results);
};


View Recipe Details:
When users select a recipe, the app fetches detailed info.
Example Code:
javascript
Copy code
const getRecipeDetails = async (id) => {
    const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`;
    const response = await fetch(url, { headers: { "X-RapidAPI-Key": "your-rapidapi-key" } });
    const recipe = await response.json();
    displayRecipeDetails(recipe);
};


Display Logic:
displaySearchResults() creates recipe cards for the search results.
displayRecipeDetails() renders ingredients and instructions.

7. APIs Used
Tasty API
Provides recipe data, including names, images, ingredients, and cooking instructions.
Endpoints Used:
/recipes/list: For searching recipes.
/recipes/get-more-info: For recipe details.
Docs: Tasty API Documentation

8. Lessons Learned
This project taught me a lot, including:
How to read and use API documentation.
Managing API requests and handling errors.
Setting up a load balancer for traffic distribution.
The importance of making a web app responsive and user-friendly.

9. Future Improvements
Add filters for dietary preferences (e.g., vegetarian, gluten-free).
Allow users to save favorite recipes by implementing user authentication.
Use caching to optimize API calls and improve performance.
Implement HTTPS for secure communication.

10. Credits
Tasty API: For providing the recipe data.
RapidAPI: For their easy-to-use platform for APIs.
Tutorials, forums, and documentation that helped along the way.

This is my first time working on a project of this kind, and I’m proud of how it turned out! 😊



