[![Build Status](https://travis-ci.org/jbelmont/containerized-golang-and-vuejs.svg?branch=master)](https://travis-ci.org/jbelmont/containerized-golang-and-vuejs)
[![Coverage Status](https://coveralls.io/repos/github/jbelmont/containerized-golang-and-vuejs/badge.svg?branch=master)](https://coveralls.io/github/jbelmont/containerized-golang-and-vuejs?branch=master)

# Containerized Golang and Vuejs applications

## Sections:

* [Preparations](#preparations)
* [Assumptions](#assumptions)
* [Running the environment](#running-the-environment)
* [Setting up HTTPS for the Golang Server](#setting-up-https-for-the-golang-server)
* [Gitbook for Docker](#gitbook-for-docker)


### Preparations:

* [Install Docker](https://docs.docker.com/engine/installation/)
* Clone this repo: `git clone https://github.com/jbelmont/docker-workshop.git`
* Docker Images:

```
docker pull mongo:3.4.5
docker pull golang:1.8.3
docker pull redis:3.2.9
docker pull mhart/alpine-node:8.0.0
```

### Assumptions:

* During this workshop the following ports will be used: `8080`, `8081`, `3000`, `3001`.

If they are not available on your machine, adjust the Docker CLI commands accordingly.

Prerequisites
-------------

Since Docker leverages the Operating System's virtualization technologies, the install requirements for Docker are specific.

OS X requirements:

- 2010 or newer model with Intel's MMU virtualization
- OS X El Capitan 10.11 or newer

Windows requirements:

- 64-bit Windows
- Windows 10 Pro, Enterprise or Education (not Home, not Windows 7 or 8) to install Hyper-V
- Windows 10 Anniversary Update or better
- Access to your machine's BIOS to turn on virtualization

[Install Docker](https://docs.docker.com/engine/installation/)

![Docker Logo](images/docker.png)

### Running the environment

* Run the script `npm run build` in order to build the 2 images for the frontend and the backend

* Run the script `npm run dev` in order to actually spin up the containers
    * Under the hood this script runs `docker-compose up frontend backend db redis`

### Setting up HTTPS for the Golang Server

* You will need to add a key and a certificate
* This can easily be done by using the following command:
    * `go run $(go env GOROOT)/src/crypto/tls/generate_cert.go --host localhost`
    * This will add a `key.pem` and `cert.pem` to the current directory
    * If running windows you should be able to the following command:
    * `go run %go env GOROOT%/src/crypto/tls/generate_cert.go --host localhost`
* Additionally you will have to update the http server in main.go
    * `http.ListenAndServeTLS(":3001", "cert.pem", "key.pem", router)`

## Gitbook for Docker

Go to the gitbook [Here](https://jbelmont.github.io/docker-workshop/)
