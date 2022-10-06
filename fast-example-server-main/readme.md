# Server for testing todo list

## Install

Run command by order

```sh
git clone git@github.com:EvgenyiFedotov/fast-example-server.git

cd ./fast-example-server

npm install

npm run start
```

Server will listen `http://localhost:3001`. (You can see correct adress in terminal)

## API

| Method | Path             | Note                 |
| ------ | ---------------- | -------------------- |
| GET    | /api/v1/todo     | For get list todo    |
| GET    | /api/v1/todo/:id | For get item of list |
| POST   | /api/v1/todo     | For creating todo    |
| PUT    | /api/v1/todo/:id | For change todo      |
| DELETE | /api/v1/todo/:id | For delete todo      |

## Todo structure

| Key         | Type    | Note                  |
| ----------- | ------- | --------------------- |
| title       | string  | Title of todo         |
| description | string  | Description of todo   |
| isDone      | boolean | Flag of done for todo |
