# User API web application


## Functionality

1. Create a web application
2. Apply CI/CD pipeline
3. Run application using the IaC approach
4. Build Docker image of application
5. Container orchestration using Docker Compose
6. Docker orchestration using Kubernetes
7. Service mesh using Istio
8. Implementing Monitoring to containerized application

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

4. Docker orchestration using Kubernetes
    Start minikube: `minikube start`.
    Then you can inside the `\k8s` folder apply the files in the following order: 
        `kubectl apply -f deployment.yaml`
        `kubectl apply -f service.yaml`
        `kubectl apply -f persistentvolume.yaml`
        `kubectl apply -f persistentvolumeclaim.yaml`
 ## Links

 ## Images folder
 Please not that there is an image folder to illustarte functionnal parts of the project `\images`

## Authors

- Gabriel Trier
- Paul-Antoine Malloi
- Romain Heimburger