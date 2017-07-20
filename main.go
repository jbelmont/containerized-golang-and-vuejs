package main

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/garyburd/redigo/redis"
	"github.com/gorilla/mux"
	"github.com/jbelmont/containerized-golang-and-vuejs/model"
	"github.com/jbelmont/containerized-golang-and-vuejs/routes"
)

const (
	localDial = "localhost:6379"
	redisURL  = "REDIS_URL"
)

func getDial() string {
	var dial string
	if os.Getenv(redisURL) == "redis:6379" {
		dial = os.Getenv(redisURL)
	} else {
		dial = localDial
	}
	return dial
}

func getRouter() *mux.Router {
	return routes.NewRouter()
}

func initRedis() redis.Conn {
	connect := SetHash()
	return connect
}

// Connect returns redis connection
func Connect() redis.Conn {
	var err error
	connect, err := redis.Dial("tcp", getDial())
	if err != nil {
		panic(err)
	}
	return connect
}

// SetHash sets a redis hash set
func SetHash() redis.Conn {
	connect := Connect()
	users := getData()
	for key, user := range users {
		key := "user:" + strconv.Itoa(key)
		_, err := connect.Do("HMSET", key, "id", user.ID, "firstname", user.FirstName, "lastname", user.LastName, "email", user.Email, "gender", user.Gender)
		if err != nil {
			panic(err)
		}
	}
	return connect
}

func main() {
	connect := initRedis()
	defer connect.Close()
	context := model.MongoSetup()
	defer context.Close()
	router := getRouter()
	log.Fatal(http.ListenAndServe(":3001", router))
}
