# Nexu Backend Coding Exercise

## Requirements

Node.js v16 or higher

## How to use

Create a copy of `.env.example` file named `.env` and setup your variables.

```
cp .env.example .env
```

Example variables

```
NODE_ENV=development
PORT=8080
```

Execute the next command to install all the dependencies

```
npm i
```

For the first use, you need to run the migrations and seeders for the database, for development and test environment the database is setted to sqlite

```
npm run compile
npm run migrate
npm run seed
```

If you are in development or test environment you should see a new file called `sequelize.sqlite`

Now your project is ready to use, execute this command to run in a development environment

```
npm run dev
```

For running tests run the following code

```
npm run test
```

For building the project run.

```
npm run build
```

This command creates a folder `./dist`, inside this folder will be the project compilation.
Now, you can start your project by running

```
node ./dist/app.js
```
