![campus logo](https://github.com/Fer-gi/caritas/assets/135590740/653efabe-5eb9-49b5-82eb-ed1d93686fb2)

# APP Talleres Campus Cáritas

Campus Cáritas APP is an application developed with React aimed at facilitating the integration and employment creation for young people aged 16 to 30 at Campus Cáritas in Madrid. The project focuses on the implementation of vocational and job training workshops, which can be assigned to campus students to enhance their holistic development and prepare them for entry into the training and employment landscape.

Campus Cáritas Connect not only aims to provide practical and theoretical training but also strives to foster a collaborative environment that promotes integration and the creation of meaningful job opportunities for the participating youth

## Folder Structure

- **client**: Contains the client-side source code.
  - **assets/img**: Images and graphic resources.
  - **components**: Reusable React components organized by functionality.
    - **admin**: Components related to administration.
    - **UpdateAndDeleteStudents**: Components for updating and deleting students.
    - **UpdateAndDeleteTeachers**: Components for updating and deleting teachers.
    - ...

  - **adminhome**: Components and styles for the admin interface.
  - **workshops**: Components and styles for workshop management.
  - **alert**: Components for displaying alerts and notifications.
  - **chat**: Components for chat functionality.
  - **footer**: Components and styles for the footer.
  - **landing**: Components and styles for the landing page.
  - **login**: Components and styles for authentication and login.
  - **navbar**: Components and styles for the navigation bar.
  - **news**: Components and styles for the news section.
  - **protectedroute**: Components for protected routes requiring authentication.
  - **register**: Components and styles for user registration.
  - **students**: Components related to students.
    - **inscription**: Components and styles for student enrollment.
    - **myworkshops**: Components and styles for workshop management by students.
    - **studenthome**: Components and styles for the student home interface.
    - ...

  - **teacher**: Components and styles related to teachers.
    - **associate**: Components and styles for associating students with workshops.
    - **inscription**: Components and styles for teacher enrollment.
    - **studentdetails**: Components and styles for viewing student details.
    - **studenthome**: Components and styles for the teacher home interface.
    - ...

  - **workshops**: Components and styles for general workshop management.
  - **welcome**: Components and styles for the welcome page.

- **context**: Contexts for managing the global state of the application.

- **routes**: Configuration of application routes.

- **.env**: Configuration file for client environment variables.

- **index.css**: Global styles for the application.

- **index.html**: Main HTML file.

- **main.jsx**: Main entry point for the React application.

- **package-lock.json**: Dependency version locking file for the client.

- **package.json**: Configuration of dependencies and scripts for the client.

- **vite.config.js**: Vite configuration for the client.

- **server**: Contains the server-side source code.
  - **firebase**: Configuration and utilities related to Firebase.
  - **controllers**: Business logic of routes.
    - **admin**: Controllers related to administration.
    - **addworkshop**: Controllers for adding workshops.
    - ...

  - **adminhome**: Logic and styles for the admin interface.
  - **updateanddeletestudent**: Logic for updating and deleting students.
  - **updateanddeleteteacher**: Logic for updating and deleting teachers.
  - **workshops**: Logic for workshop management.
  - **student**: Logic related to students.
    - **incription**: Logic for student enrollment.
    - **myworkshops**: Logic for workshop management by students.
    - **studenthome**: Logic for the student home interface.
    - ...

  - **teacher**: Logic related to teachers.
    - **associate**: Logic for associating students with workshops.
    - **inscription**: Logic for teacher enrollment.
    - **studentdetails**: Logic for viewing student details.
    - **studenthome**: Logic for the teacher home interface.
    - ...

  - **workshops**: Logic for general workshop management.
  
- **tests**: Contains unit and end-to-end tests.

- **.babelrc**: Babel configuration for the server.

- **firebase.json**: Configuration for Firebase hosting.

- **package-lock.json**: Dependency version locking file for the server.

- **package.json**: Configuration of dependencies and scripts for the server.

- **.gitignore**: Gitignore file to exclude certain files from version control.

- **README.md**: Main documentation file for the project.


# Installation Guide

Follow these steps to set up and run the project in your local environment.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it [here](https://nodejs.org).

## Client Setup

1. Navigate to the `client` directory: `cd client`.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the `client` directory and configure any necessary environment variables.

   Example `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain

4. Run `npm start`  to start the development server.

## Server Setup

1. Navigate to the server directory: cd server.
2. Run npm install to install dependencies.
3. Create a .env file in the server directory and configure any necessary environment variables.

Now, your project should be up and running. Open your web browser and go to your local host to access the application.

#### Dependencies:

- **firebase**: Provides tools and services for working with Firebase, which is a cloud application development platform.

- **material-icons**: Provides Google's Material Design icons for use in the user interface.

- **react**: JavaScript library for building user interfaces.

- **react-bootstrap**: Bootstrap 5 implementation for React, making layout and component creation easier.

- **react-dom**: React for the DOM, necessary for rendering React components in the browser.

- **react-firebase-hooks**: Hooks for efficiently using Firebase with React.

- **react-icons**: Provides popular icons as React components.

- **react-router-dom**: Routing tools for React.

- **react-toastify**: Library for displaying toast notifications in the user interface.

- **supertest**: Testing framework for end-to-end testing of Node.js applications.

- **uuidv4**: Generates universally unique identifiers (UUID).

- **vitest**: Testing tool for Vite applications.

#### Development Dependencies:

- **@testing-library/jest-dom**: Provides useful testing functions related to the DOM.

- **@testing-library/react**: Testing utilities for React applications.

- **@testing-library/user-event**: Simulates user events for UI testing.

- **@types/react**: TypeScript type definition files for React.

- **@types/react-dom**: TypeScript type definition files for ReactDOM.

- **@vitejs/plugin-react**: Vite plugin to support React file compilation.

- **eslint**: Tool for finding and fixing issues in your JavaScript/TypeScript code.

- **eslint-plugin-react**: Specific linting rules for React.

- **eslint-plugin-react-hooks**: Specific linting rules for React hooks.

- **eslint-plugin-react-refresh**: Specific linting rules for React refresh.

- **jsdom**: DOM implementation for Node.js used in testing.

- **msw**: Library for mocking HTTP requests in tests.

- **vite**: Fast build and development tool for modern web applications.




## Contribution

We welcome your contributions to help grow this project! If you want to contribute, follow these steps:

1. Clone the repository.
2. Create a branch for your contribution: `git checkout -b branch-name`.
3. Make your changes and ensure the tests pass.
4. Submit a pull request for us to review your changes.

## Team

- [@Jassed Martinez](https://github.com/Jassedd)
- [@Emlily Martínez](https://github.com/emilykml)
- [@Gisela Fernandez](https://github.com/Fer-gi)
- [@Luis Guillent](https://github.com/afterdarkv1)
- [@Diego Bordallo](https://github.com/DBordallo)

This project is maintained by Gisela, Emily, Jassed, Luis, and Diego.

Thank you for being a part of this exciting Talleres Campus Cáritas APP project!

