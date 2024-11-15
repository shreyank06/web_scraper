A Dockerized web scraper that fetches fire location data (latitude/longitude) from NASA's FIRMS feed every 3 hours and stores it in PostgreSQL. Includes Dockerfile and docker-compose.yml for easy setup.

###  Build and Run the Docker Containers
The application and PostgreSQL database are managed using Docker Compose. Use the following commands to build and start the containers:
```
docker-compose build
docker-compose up
```

This command will:

    Start the PostgreSQL database and initialize it with the specified user, password, and database.
    Run the web scraper, which will start fetching data and updating the database every 3 hours.

### Stopping the Containers
To stop the application, run:
```
docker-compose down
```
