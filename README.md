# natHacks2021

The following are needed to run the website:

- Latest version of [Node.js](https://nodejs.org/en/)
- Latest version of [NPM (Node Package Manage)](https://www.npmjs.com/get-npm)
- Latest version of [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
- Latest version of [git](https://git-scm.com/) (**This is optional. It requires only if you choose to clone project**)



### Getting Started

1. You can either clone or download (upack the zip into a folder) the repository from Github

2. Navigate to the main project directory in the terminal or powershell (windows) and run the following command

   npm install

3. Next navigate to the client directory (cd client) and run the same command

   npm install

4. Now enter the config folder from the main project directory and open keys.sample.js to edit the mongoURT to be:
 
   "mongodb://localhost:27017/natHACKS2021"

5. Save and rename to the file to keys.js

6. Next in MongoDB compass connext using the following URI

   "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

7. Start the server by navigateing to the porject directory in terminal or powershell (windows) and running 

   npm run dev

8. Once the server is running it will automatically open the site on a browser. If that does not occur then you can open the homepage
   by going to the following URL: 'localhost:3000' 

