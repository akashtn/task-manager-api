This is a simple task manager API written using NodeJS, Express and MySQL.


`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests.

Lets take a look inside the `src` folder

 - `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion (this is done in the `server-config.js`). One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here. 

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it. 

 - `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc. 

 - `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output. 

 - `repositories` -> this folder contains all the logic using which we interact with the DB by writing queries, all the raw queries or ORM queries will go here.

 - `services` -> contains the buiness logic and interacts with repositories for data from the database.

 - `utils` -> contains helper methods, error classes etc.

### Setup the project

 - Download this template from github and open it in your favourite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<port number of your choice>
        DB_PASSWORD=<enter the db password here>
        DB_NAME=<name of your mysql db>
        DB_USERNAME=<db username>
        DB_HOST=<db host>
    ```
    ex: 
    ```
        PORT=3000
        DB_PASSWORD=password
        DB_NAME=task-manager-db
        DB_USERNAME=root
        DB_HOST=localhost
    ```
 - You need to have mysql and mysql workbench installed to get all the required db details like the host, username, password and the name of the db. Use 'localhost' for DB_HOST for a local installation of mysql.

 - To run the server execute
 ```
 npm run dev
 ```


### Testing the API

Use an API testing software like Postman
- To get all the tasks, make a get request to ```/api/v1/tasks```

- To get metrics for a particular month of a year, make a `get` request to ```api/v1/tasks?year=2023&month=10```

  Pass the 4 digit year and 1 or 2 digit month as query string

- To get metrics for a particular year, make a `get` request to ```api/v1/tasks?year=2023```

  Pass the 4 digit year as query string
  
- To create a task, make a `post` request to ```/api/v1/taks```
  
  Set the body to JSON and pass a JSON object with description (compulsory) and status(optional, set to "open" by default)

  Ex: {
    "description": "Get milk",
  }

- To update a task, make a `patch` request to ```/api/v1/tasks```

  Set the body to JSON and pass a JSON object with either the updated descrption or status attribute or both. Status can be one of "open", "in-progess" or "completed"

  Ex: {
    "description": "Complete assignment",
    "status": "in-progress"
  }
  