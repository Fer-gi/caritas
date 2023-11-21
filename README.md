![Logo](https://www.caritasmadrid.org/assets/logo_rojo_orig.png)

# Campus Cáritas APP

Campus Cáritas APP is an application developed with React aimed at facilitating the integration and employment creation for young people aged 16 to 30 at Campus Cáritas in Madrid. The project focuses on the implementation of vocational and job training workshops, which can be assigned to campus students to enhance their holistic development and prepare them for entry into the training and employment landscape.

Campus Cáritas Connect not only aims to provide practical and theoretical training but also strives to foster a collaborative environment that promotes integration and the creation of meaningful job opportunities for the participating youth

## Getting Started

### Clone the repository:
```bash
git clone https://github.com/your-username/campus-caritas.git
cd campus-caritas
``` 

### Install dependencies:
```bash
cd client
npm install
cd ../server
npm install
```

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/campus-caritas.git
    cd campus-caritas
    ```

2. **Install dependencies:**

    ```bash
    cd client
    npm install

    cd ../server
    npm install
    ```

3. **Set up your Firebase configuration:**

   - Create a Firebase project and obtain the necessary credentials.
   - Update the Firebase configuration in `server/firebase/firebase.jsx`, `server/firebase/firebaseBack.js`, and `server/firebase/firebaseRead.js`.

4. **Run the application:**

    ```bash
    cd client
    npm run dev
    cd ../server
    npm start
    ```

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Dependencies

- [Firebase](https://firebase.google.com/): ^10.5.2
- [Material Icons](https://material.io/resources/icons/): ^1.13.12
- [React](https://reactjs.org/): ^18.2.0
- [React Bootstrap](https://react-bootstrap.github.io/): ^2.9.1
- [React DOM](https://reactjs.org/): ^18.2.0
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks): ^5.1.1
- [React Icons](https://react-icons.github.io/react-icons/): ^4.11.0
- [React Router DOM](https://reactrouter.com/): ^6.18.0
- [React Toastify](https://fkhadra.github.io/react-toastify/): ^9.1.3
- [UUIDv4](https://www.npmjs.com/package/uuidv4): ^6.2.13

## Folder Structure
The client directory contains the main frontend application, organized into various components and pages. The server directory contains the backend code.

### Client Folder Structure
The client folder structure is organized as follows:

- assets: Contains images and other static assets.
- components: Reusable React components used throughout the application.
- context: Holds the application context, such as the authentication context.
- routes: Defines the application routes and main entry points.
- .env: Environment variables for the client application.
- .eslintrc.cjs: ESLint configuration file.
- index.css: Global styles.
- index.html: HTML template.
- main.jsx: Entry point for the React application.
- package.json: Node.js package configuration.
- vite.config.js: Vite configuration file.
### Server Folder Structure
 The server folder structure is organized as follows:

- firebase: Modules for Firebase interaction.
- src/routes: Defines the server routes and main entry points.
- .env: Environment variables for the server application.
- firebase.json: Firebase configuration file.
- package.json: Node.js package configuration.