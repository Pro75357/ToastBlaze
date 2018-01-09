# ToastBlazeThis is a prototype of the TOAST app- "The [OCHIN](https://ochin.org/) Ambulatory Support Tool" - a single-page patient summary designed for clinicians. This app is developed in [Meteor](https://www.meteor.com/), a full-stack javascript framework, and is the UI component of the system only. This prototype simply uses CSV files imported on startup to simulate an accompanying data infrastructure, however a production version would rely on a data infrastructure and accompanying database logic to populate views or support SQL calls which can then be used by the application.**To Run the application in development mode:**1. Install [Meteor](https://www.meteor.com/)2. Using git, clone this repository3. (Optional): to use the AHRQ features, get an AHRQ ePSS api key from [Ahrq.gov](https://epss.ahrq.gov/PDA/epssjson.jsp), then rename ToastBlaze/Private/ePSS\_Key.json.EXAMPLE to just ePSS\_Key.json and place your key in this file. 4. In your terminal, navigate to application directory (ToastBlaze/ToastBlaze)5. Install a few NPM/node dependencies that Meteor does not handle:  - "meteor npm install --save babel-runtime" - "meteor npm install chart.js"6. Finally, run "meteor" -> Meteor will build and serve the application by default at port 30007. The web application can be accessed from [http://localhost:3000](http://localhost:3000)The application can also be bundled as a node.js application- for example see this [tutorial](https://www.phusionpassenger.com/library/walkthroughs/deploy/meteor/)**Application Structure**