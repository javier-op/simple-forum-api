# simple-forum-api
An api with the functionalities of a simple forum.

Repository: https://github.com/javier-op/simple-forum-api

# User endpoints
```POST /register``` : create a user

Request body format:
```
{
    "username": "a_username",
    "email" "an_email@email.com",
    "password": "a_safe_password"
}
```

Response format:
```
STATUS CODE 201
{
    "username": "a_username",
    "email" "an_email@email.com",
    "token": "login_token"
}
```

```POST /login``` : login with a user and password

Request body format:
```
{
    "username": "a_username",
    "password": "a_safe_password"
}
```
Response format:
```
STATUS CODE 200
{
    "username": "a_username",
    "email" "an_email@email.com",
    "token": "login_token"
}
```

# Thread endpoints
All thread endpoints need login token in the header:
```
"x-access-token": "login_token"
```
```POST /thread``` : create a thread

Request body format:
```
{
    "title": "a_title",
    "content" "some_content"
}
```

```GET /thread``` : list all threads

```GET /thread/{id}``` : retrieve a thread and its comments

```PUT /thread/{id}``` : edit content of a thread (title is not editable)

Request body format:
```
{
    "content" "some_content"
}
```

```DELETE /thread``` : delete a thread

# Comment endpoints
All comment endpoints need login token in the header:
```
"x-access-token": "login_token"
```
```POST /comment``` : create a comment

Request body format:
```
{
    "thread_id": "an_id",
    "content" "some_content"
}
```

```GET /comment/{id}``` : retrieve a comment

```PUT /comment/{id}``` : edit content of a comment

Request body format:
```
{
    "content" "some_content"
}
```

```DELETE /comment``` : delete a thread

# Installation and usage
This api was developed with NodeJS 14.18.1 and MongoDB 5.

The following environment variables must be defined in a .env file in the project root:

```
API_PORT=4001
MONGO_URI="mongodb://localhost:27017/forum"
TOKEN_KEY="abcdef"
JWT_EXPIRATION_TIME="2h"
```
For TOKEN_KEY any string should work, for JWT_EXPIRATION_TIME it can be in seconds or a string with: m (minutes), h (hours), d (days).

To install dependencies:
```
npm install
```

To run:
```
npm start
```
