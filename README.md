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
