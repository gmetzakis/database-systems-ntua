For installation:



1. Fill correctly the "password" field in files "back-end/controller/db.js" and "back-end/server.js" if MySQL Server is password protected.



2. Open terminal at home root of project (/Databases_app):
  
	a. Run "cd sql" to enter sql folder.
  
	b. Run "mysql -u root" or "mysql -u root -p" if MySQL Server is password protected.
  
	c. Run "source init.sql;" to initialize and fill the database.
  


3. Open new terminal at home root of project (/Databases_app):
  
	a. Run "cd back-end" to enter back-end folder.
  
	b. Run "npm install" to download dependencies and create node_modules folder.
  
	c. Run "node server" to connect to the server.
  


4. Open new terminal at home root of project (/Databases_app):

	a. Run "cd front-end" to enter front-end folder.
  
	b. Run "npm install" to download dependencies and create node_modules folder. (THAT WILL TAKE A WHILE!!)
  
	c. Run "npm start" to open the UI.
  


5. Go to "localhost:3000" and have fun! (It may take a while to load the first time, so don't close it, thinking that it doesn't work)