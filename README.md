# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Regarding this project:
Before refactoring: 
Originally, api server is running on port 5000
-> cd to src folder first then
-> node server.js

at the same time run ' yarn start ' to run my local repo

After refactoring: my api server is now hosted on vercel (https://target-test-api.vercel.app/) and the data base collection (cards-data) is on MongoDb

### Code Structure:
TodoPage => renders the cards and landing page 
AddTodoSection 
=> renders the modals which handles the passing of the props for editing the values of the card
=> also handles the PUT and POST of the card values to the API server and the Mongodb collection for my cards data

TodoCard
=> handles the delete of the cards
=> calls the GET func of api to read the data in the Mongodb collection to render on current cards onto the page
=> handles the edit button icon on the cards

TodoLandingPage
=> landing page when there are no cards

