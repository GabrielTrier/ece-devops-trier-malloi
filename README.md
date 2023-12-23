# User API web application


## Functionality

1. Start a web server
2. Create a user
2. Get a user

## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

Go to the root directory of the application (where `package.json` file located) and run: `npm install`

## Usage

1. Start a web server

From the root directory of the project run: `npm start`

It will start a web server available in your browser at http://localhost:3000.

2. Getting docker image from docker hub

link: https://hub.docker.com/r/gabrieltrier/userapi 

command to pull image: `docker pull gabrieltrier/userapi` 

3. Starting application with docker-compose

Command : `docker-compose up`

Go to http://localhost:5000/ to access it 

## Authors

- Gabriel Trier
- Paul-Antoine Malloi
- Romain Heimburger