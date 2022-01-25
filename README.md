# Hacker News Application

This application gets data from the [Hacker News API](https://hn.algolia.com/api/v1/search_by_date?query=nodejs) every 1 hour and stores in a local mongo database. This data finally is displayed in the frontend. 

The frontend has been developed with Angular 12 and the backend with Nest.js.

This repository contains the following:
- **api-hacker-news/**: Heres is the backend code.
- **hacker-news/**: Here is the frontend code.
- **docker-compose.yml**: The docker-compose file which is going to help to start the application.

## Steps to start the application

1. Clone the repository
2. In command line, go to the cloned repository.
3. Execute the build of the docker-compose with the following sentence:

```
docker-compose build
```

4. Starts the containers with the following sentence:
```
docker-compose up
```

5. When the application starts it is needed to execute te first migration, sending a POST request to the following endpoint:
http://localhost:4000/article/migrate
You can use CURL, Postman or any other REST Client to send the request.

After the first migration, once an hour the scheduler will execute the migrations automatically.

The application will deployed in the following URLs:
- Frontend: http://localhost:4200/
- Backend: http://localhost:4000/

## Stay in touch
- Author - Almendra Estrada
- LinkedIn - [https://www.linkedin.com/in/almendra-estrada/](https://www.linkedin.com/in/almendra-estrada//)
