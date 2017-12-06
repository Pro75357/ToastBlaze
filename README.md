# ToastBlaze

This is a prototype of the TOAST app- "The OCHIN Ambulatory Support Tool" - a single-page patient summary designed for clinicians. This app is developed in Meteor, a full-stack javascript framework, and is the UI component of the system only. The production version is to rely on a data warehouse and accompanying logic to populate views/ tables which can then be read and used by the UI. 
This prototype uses CSV files imported on startup to simulate an accompanying data infrastructure. 

To Run the application in development mode:
1. Install Meteor (https://www.meteor.com/)
2. Using git, clone this repository
3. In the terminal, change directory (cd) into the repository's root directory
4. Extract "Example.zip" to the root directory -> This will create a new top-level private folder with example data files
5. Run "meteor npm install --save babel-runtime"
6. Run "meteor" -> Meteor will build and serve the application by default at port 3000
7. The web application can be accessed from HTTP://localhost:3000

** To enable the AHRQ ePSS features, you will need a developer key. Instructions to obtain a key can be found here: https://epss.ahrq.gov/PDA/epssjson.jsp
** The key should be placed in the corresponding text file in the Private folder.

** App currently in heavy development. 
