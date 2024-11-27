# worlwide-recipe_finder

Welcome to the Worldwide Recipe Finder, a project I built to explore and practice working with APIs, responsive design, and deployment on a load-balanced server setup. This web application allows users to search for recipes from all over the world, view detailed instructions, and discover new cooking ideas.

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
        I cloned the Repository:(Using the https)
            git clone https://github.com/mwaniasam/worldwide-recipe_finder.git
        Then on the terminal, cd worldwide-recipe-finder


    Getting an API Key:

        I signed up on RapidAPI(https://rapidapi.com/) and subscribed to the free version of to the Tasty API{(https://rapidapi.com/apidojo/api/tasty/playground/apiendpoint_abf1bbc2-d08d-462b-b733-17392192ca46)(The API I found good enough for things to do with food)}.
        I copied the API key provided and saved it securely.

    Setting the API Key:

        I opened the script.js file and added the API key.

    Run Locally:

        I opened index.html in my browser and started using the app. It was running perfectly. I was so happy!

4. How to Use

Search Recipes:
    Enter a keyword (like tacos or chicken or pizza) in the search bar.
    Click "Search" to see a list of recipe options.

View Details:
    Click the "View Details" button on any recipe to see cooking instructions, ingredients, and at some instances a video. Cool, right!?. And the details open in a new page thus ensuring smoothness and easy navigation.

On Mobile:
    The app adjusts perfectly for mobile screens, so you can use it on any device!

5. Deployment Process

    I deployed the app on three servers(Provided by my great university, The African Leadership University. Honestly it is one of the best universities in the continent):
        Web-01 and Web-02 are the main web servers.
        Lb-01 is the load balancer ensuring traffic is distributed evenly between the two servers. It also carries the domain name.

    Steps for Deployment:
        Before uploading, I created a zip file for the directory containing all the files. To create a zip file, I used this command;
            zip -r recipe-finder.zip recipe-finder
            
    Uploading the files to the servers(The zip file of course):

        scp -r recipe-finder.zip ubuntu@web-01:/var/www/html/
        scp -r recipe-finder.zip ubuntu@web-02:/var/www/html/

    ssh to web-01(and web-02 afterwards)

        Imagine I had to install unzip to my terminal(sudo apt-get install unzip)

    cd to /var/www/html/(Where the zip file was copied)

        Then run unzip recipe-finder.zip

    NOTE: nginx is already configured and running. This is what we have been doing whole semester!


    Configure it to serve the app from /var/www/html.
    Configure Nginx to forward traffic to Web-01 and Web-02:

        server {
            listen 80;
            listen [::]:80;

            server_name web-01;

            root /var/www/html/;
            index index.html;

            location / {
                try_files $uri $uri/=404;
            }
        }


    Restart Nginx: sudo systemctl restart nginx.
    Test Deployment:
    Open http://web-01-01-ip in your browser to verify the app works as expected.

    The Load balance is well configured using haProxy. It is sending traffic to both web-01 and web-02.
        frontend onemwaniasam
            bind *:80
            bind *:443 ssl crt /etc/letsencrypt/live/www.onemwaniasam.tech/onemwaniasam.pem
            http-request redirect scheme https unless { ssl_fc }
            default_backend app

        backend app
            balance roundrobin
            server 6341-web-01 54.89.172.80:80 check
            server 6341-web-02 54.82.194.92:80 check
    Also, it is here where I have an ssl certificate(certbot) configured. The web application is secure.

    Also, to view the application globally(Remotely), use the lb-01 IP address or www.onemwaniasam.tech.

6. Understanding the Code

    Search Functionality:
    Users input a keyword, and the app makes an API call to fetch recipes.
    
    Example Code:

        const searchRecipes = async (query) => {
            const url = `https://tasty.p.rapidapi.com/recipes/list?q=${query}&from=0&size=10`;
            const response = await fetch(url, { headers: { "X-RapidAPI-Key": "your-rapidapi-key"(#I cannot put the key here) } });
            const data = await response.json();
            displaySearchResults(data.results);
        };


    View Recipe Details:
    When users select a recipe, the app fetches detailed info.
    
    Example Code:

        const getRecipeDetails = async (id) => {
            const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`;
            const response = await fetch(url, { headers: { "X-RapidAPI-Key": "your-rapidapi-key"(I cannot put the key here! But I used tasty api) } });
            const recipe = await response.json();
            displayRecipeDetails(recipe);
        };


    Display Logic:
        displaySearchResults() creates recipe cards for the search results.
        displayRecipeDetails() renders ingredients and instructions.

7. APIs Used
    Tasty API
        Base  URL: https://tasty.p.rapidapi.com

    Endpoints   
        /recipes/lists: Searches recipes by keyword, tag or ingredient.
        /recipes/get-more-info: Fetches detailed information about a recipe.
            Provides recipe data, including names, images, ingredients, and cooking instructions.

    Authentication: You must sign up for an account on RapidAPI to get an API key.

8. Challenges and Solutions
    1. API has a rate limit.
        The tasty API Has a rate limit(500 requests in a month and 5 requests every 5 seconds)  meaning a user can only make a certain number of requests within a given period.
        To address this issue, I implemented proper error handling to alert the user when the rate limit is exceeded. Additionally, I added caching for frequently searched recipes to reduce the number of requests.
    2. Responsiveness
        Ensuring the application looked good on both desktop and mobile devices was not easy. I used CSS media queries and flexible layout to make sure the page adapts to various screen sizes. Whether you are using a smartphone or computer, you can use this application.
    3. API errors
        IN some scenarios, the API is usually down or not responding, this had to be handled. I added try-catch blocks in JavaScript to handle API call errors and provide meaningful messages to the user.
    4. Deploying the application to the servers was no joke.
        I worked through server configuration ensuring nginx was correctly set up to serve the app and the load balancer was well configured to distribute traffic between the two servers.

9. Lessons Learned
    This project taught me a lot, including:
        How to read and use API documentation.
        Managing API requests and handling errors.
        Setting up a load balancer for traffic distribution.
        The importance of making a web app responsive and user-friendly.

10. Future Improvements
    Add filters for dietary preferences (e.g., vegetarian, gluten-free).
    Allow users to save favorite recipes by implementing user authentication.
    Use caching to optimize API calls and improve performance.
    Implement HTTPS for secure communication.

11. Credits
    RapidAPI:
        Shoutout to RapidAPI for managing and hosting the Tasty API and providing access to it to developers, with even a free version. THe free version is very convenient to students.
    Tasty API:
        This is a very great resource for retrieving recipe data. Shoutout to the API developers(API Dojo) for providing an easy-to-use plartform.
    Google Fonts:
        Shoutout to ggoogle fonts for the custom fonts.
    African Leadership UNiversities: 
        Provided me with the web servers that I used.
    .tech:
        Alongside ALU, they provided the domain I am using(onemwaniasam.tech). Big shoutout to their support team(Charul V) who helped me restore my domain after it was suspended due to RAA verification issues. The support teams response is very fast.

12. Conclusion
    This project showcases how to integrate a third-party API into a web apllication, deploy it to web servers and ensure it is responsive and functional across different devices.
    The Tasty API provides rich recipe data that is easily accessible and with a few lines of HTML, CSS and JavaScript, I was able to create a user friendly recipe search and detail view application.

This is my first time working on a project of this kind, and I’m proud of how it turned out! 😊



