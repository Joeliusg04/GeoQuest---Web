# GeoQuest - Project Web Page
This is the README file for the GeoQuest web page, which is part of a larger project. The web page has been developed using the Vue.js framework and provides an interactive platform for exploring and discovering hidden treasures in different locations. GeoQuest supports two types of users: Admin and Player, each with specific functionalities.

## Features
### Admin
 - Treasure Creation: Administrators can create new treasures and add detailed information such as name, description, location, and  clues.
 - Treasure Editing: Administrators have the ability to edit existing treasure information, allowing them to update descriptions, clues, or locations.
 - Treasure Deletion: If a treasure is no longer relevant or needs to be removed, administrators can delete it from the platform.
 - Review Management: Administrators have access to user reviews and comments about treasures, as well as reports from users regarding inappropriate or suspicious treasures.
In addition, administrators also have access to all the functionalities available to players.

### Player
 - Authentication: Players can log in to their accounts using login credentials.
 - Registration: New users can create an account on GeoQuest by providing basic information.
 - Map Exploration: Players can explore an interactive map to discover the location of treasures.
 - Treasure Details: By clicking on a treasure on the map, players can access detailed information such as descriptions, clues, and comments from other players.
 - Profile Editing: Players have the option to edit their profile, update personal information, and add a profile picture.
 - Player Statistics: Players can view their game statistics, including the number of treasures found, their score, and unlocked achievements.
 - Favorites: Players can mark treasures as favorites for quick access in the future.
 - Reviews: Players can leave reviews and comments on the treasures they have discovered.
### Available Pages
The GeoQuest web page includes several key pages that allow users to interact with the platform effectively:

 - Login: Page for logging into an existing account.
 - Register: Page for registering a new account on GeoQuest.
 - Home: Main page of the platform, from where users can access other functionalities.
 - Map: Allows players to explore an interactive map to find the location of treasures.
 - Treasure Info: Page that displays detailed information about the selected treasure, including descriptions, clues, and comments.
 - Edit Profile: Page where users can edit their personal information, view their statistics, favorites, and reviews.
 - Error: Customized page to handle errors and technical issues during navigation.
## Mobile Application
This project also includes a complementary GeoQuest mobile application, where players can fully enjoy the game and all its features. The mobile application offers an interactive and user-friendly experience for discovering treasures, interacting with other players, and enjoying the thrill of treasure hunting. Through the web page, users can access the mobile application, and vice versa, providing flexibility and options to the players.

## Project Setup
Requirements: Make sure you have the latest stable version of Node.js and NPM installed on your machine.

 - Installing Dependencies: In the root folder of the project, run the following command to install all the necessary dependencies:

    ```bash
    npm install
    ```

 - Environment Configuration: Create a .env file in the root of the project and provide the following configuration values:

    ```bash
    API_URL=<API_server_URL>
    ```

Compiling and Running: To compile and run the project on a local server, use the following command: 

```bash
npm run serve
```



The project will be compiled and run on the local server. Open your web browser and access the following URL: http://localhost:8080 to view the GeoQuest web page.

## Contributions
Thank you for considering contributing to GeoQuest! If you would like to contribute to the project, follow these steps:

1. Fork the GeoQuest repository.
2. Create a branch (git checkout -b feature/new-feature) for your contribution.
3. Make the changes and improvements in your local branch.
4. Commit your changes (git commit -am 'Add a new feature').
5. Push your branch (git push origin feature/new-feature).
6. Open a pull request on the original repository and describe your changes in detail.

We appreciate all contributions that help improve GeoQuest and provide a better experience for users.

## Support
If you encounter any issues, have questions, or suggestions, feel free to open an issue on the GeoQuest repository. We'll be happy to assist you and resolve any problems you may encounter.

## License
GeoQuest is distributed under the MIT License. For more information, see the LICENSE file in the project.

We hope you enjoy playing GeoQuest on the web page and mobile application! Feel free to customize and adapt the project to your specific needs. If you have any further questions, don't hesitate to contact us. Have fun exploring hidden treasures and improving your skills as a player!
