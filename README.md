# 📖✨The Recipe Book ✨📖

Developed by [@Agnes Lily](https://github.com/AgnesLily2772)💻

## 🔍 Overview

The Recipe Book Application is a web-based platform designed to help users
organize, discover, and share their favorite recipes. This application provides a
user-friendly interface for creating, editing, categorizing, and searching for
recipes, along with features for user accounts, comments, and social sharing.

## 🛠️ Specifications

* Frontend: React.js for the user interface.
* Backend: Node.js and Express.js for the server.
* Database: MongoDB and Redis for storing user data and notes.
* Authentication: Implement user authentication using JWT (JSON Web Tokens).
* CSS Framework: Use a responsive CSS framework like Bootstrap for styling.
* Deployment: Host the application on  Netlify/Render.
* Version Control: Use Git and GitHub for version control.

## 🎯 Project Objectives

* User-Friendly Interface: Develop an intuitive and easy-to-use interface for
  creating, viewing, and managing recipes.
* Recipe Creation: Allow users to create, edit, and format recipes, including
  ingredients, instructions, images, and preparation time.
* Recipe Categorization: Implement recipe categorization and tagging to help
  users organize their recipes effectively.
* Search and Filter Functionality: Provide a search feature and advanced filtering
  options to help users quickly locate specific recipes based on criteria such as
  cuisine, ingredients, and dietary restrictions.
* User Accounts: Implement user registration and login systems, allowing users to
  save their favorite recipes, create their recipe collections, and track their activity.
* Commenting System: Allow users to leave comments on recipes and interact
  with other users.
* Responsive Design: Develop a responsive design to ensure the application is
  accessible on various devices and screen sizes.
* User Preferences: Allow users to customize their profile and recipe display
  options, such as themes and font preferences.

## 🖼️ Website Images

For detailed images showcasing the website output and contributions, please refer to the `contributions.md` file.

You can find the images and additional information in [documentation.md](./documentation.md).

## 🌿 Branches

- **[Main](https://github.com/AgnesLily2772/RecipeBook/tree/main):** The main branch for stable releases.
- **[Dev](https://github.com/AgnesLily2772/RecipeBook/tree/dev):** The development branch for ongoing work.

#### 🚀 Feature Branches

- **[feature/authentication](https://github.com/AgnesLily2772/RecipeBook/tree/feature/authentication):** I have introduced comprehensive authentication features covering the frontend and backend. The frontend updates include the creation of key components such as Home, Navbar, and dedicated pages for Signup, Signin, Signout, and Profile. The authentication logic has been seamlessly integrated into the AuthReducer and the overall application context.
- **[feature/recipe-crud](https://github.com/AgnesLily2772/RecipeBook/tree/feature/recipe-crud):** Includes CRUD operation in which the users can create, update, edit and delete recipes. Designed the UI, modeled the database, specified routes and wrote controller logics to read, write and retrieve data from and to the server. The API endpoints were tested with Insomnia before serving to the frontend.
- **[feature/filter-and-search](https://github.com/AgnesLily2772/RecipeBook/tree/feature/filter-and-search):** Implemented a comprehensive search functionality for recipe titles, allowing users to easily find their favorite dishes. Additionally, added filter options for recipe preparation time, number of ingredients, cuisine, and category. Now, users can customize their recipe exploration experience, making it more convenient and tailored to their preferences.
- **[feature/comments-functionality](https://github.com/AgnesLily2772/RecipeBook/tree/feature/comments-functionality):** I have implemented comments functionality to enable users to create and display comments for recipes. This includes the integration of both the comment creation and retrieval processes. The endpoint now allows users to add comments to specific recipes, and the corresponding display functionality ensures that comments are appropriately shown for each recipe. This enhancement enhances the overall user engagement by facilitating communication and feedback on recipes.
- **[feature/ui-improvements](https://github.com/AgnesLily2772/RecipeBook/tree/feature/ui-improvements):** Made the UI responsive to mobile devices and ensured the website accessibility in mobile and laptop devices. Embedded my custom [logo](./frontend/src/Design/RecipeBook_Logo.png) in the home page. Designed an error page that redirectes all the invalid routes towards signin page.

#### 🐛 Bugfix Branches

- **[bugfix](https://github.com/AgnesLily2772/RecipeBook/tree/bugfix):** I have fixed almost all bugs that includes form validations, response error handling, bootstrap modal rendering, node mailer error, cookie maintenance and I have Checked overall functionality of all the React components.

#### 📝 Documentation Branch

- **[documentation](https://github.com/AgnesLily2772/RecipeBook/tree/documentation):** Added `documentation.md` file and attached all the website previews. Updated the README.md file.

## 🌐 Deployed URLs

- **Frontend Deployment:** [https://recipebook-frontend.netlify.app/](https://recipebook-frontend.netlify.app/)
- **Backend Deployment:** [https://recipebook-backend-rmgn.onrender.com/api](https://recipebook-backend-rmgn.onrender.com/api)
