# Task Management Application

This repository features a simple task management application built with NodeJS and React. It's a basic project that showcases my ability to work with these technologies and is part of a home assignment.

## Requirements
- node-v19.5.0
- Docker version 20.10.21
- docker-compose version 1.29.2
## Installation

To run the Backend NodeJS:

- create ```.env``` file under main directory
- execute these commands: 

```bash
  cd app
  npm config set legacy-peer-deps true
  npm install
  docker-compose -f dev/docker/docker-compose.debug.yml up -d
  npx prisma migrate dev --name init
  npm start
```

Frontend:

```bash
  cd app/client
  npm install
  npm start
```


## API Reference

#### Get all tasks

```bash
  curl --location --request GET '127.0.0.1:3000/tasks'
```

#### Create a new task

```bash
  curl --location --request POST '127.0.0.1:3000/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{
    "task": {
        "title": "Title",
        "description": "Description"
    },
    "attach": {
        "ids": []
    }
}'
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `Dict` | **Required**. task details, `title` and `description` |
| `attach` | `Dict` | **Optional**. tasks to attach, `ids`  |

#### Delete an existing task

```bash
  curl --location --request DELETE '127.0.0.1:3000/tasks/<TASK_ID>'
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `TASK_ID` | `number` | **Required** task id |

#### Get all users

```bash
  curl --location --request GET '127.0.0.1:3000/users'
```
