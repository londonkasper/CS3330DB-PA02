# CS3330DB
# Project 2: Creating an API
London Kasper and Jeremy Waibel
### Running the program:
First, make sure that the mysql service is up and running on your device. Connect to a database connection in Datagrip, DBeaver, or whichever program you prefer. From here, navigate to VS Code and enter the following into the terminal: “node index.js”<br></br>
From here, you should be able to access the API through a handler like Insomnia. 
### The program:
This program is a REST API that allows stadium employees to create an account, maintain a session, and create/edit/delete parking spot allocations. Additionally, employees are able to view information relating to parking spots through different search queries.  
<br></br> The project is formatted in a MVC structure, where all interactions with the database take place in the models directory. 
Additionally, this program uses authorization headers in order to maintain a user's session across multiple requests. 