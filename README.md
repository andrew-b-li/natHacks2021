# natHacks2021

The following are needed to run the website:

- Latest version of [Node.js](https://nodejs.org/en/)
- Latest version of [NPM (Node Package Manage)](https://www.npmjs.com/get-npm)
- Latest version of [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
- Latest version of [git](https://git-scm.com/) (**This is optional. It requires only if you choose to clone project**)



### Getting Started

1. You can either clone or download (upack the zip into a folder) this repository (new-auth branch) from Github.

2. Navigate to the root directory of the project in the terminal or powershell (Windows) and run the following command:

   npm install

3. Next, navigate to the client directory (`cd client`) and run the same command.

   npm install

4. Now enter the config folder from the main project directory and open keys.sample.js. Edit the mongoURT to be:
 
   "mongodb://localhost:27017/natHACKS2021"

5. Save and rename the file to keys.js

6. Start the server by navigating to the root directory of the project in the terminal or powershell (Windows) and running: 

   npm run dev

7. Once the server is running, it will automatically open the website in your default browser, or it may be accessed by visiting http://localhost:3000.
