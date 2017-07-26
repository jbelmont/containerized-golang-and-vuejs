package redis

import (
	"log"
	"os"

	"github.com/garyburd/redigo/redis"
	"github.com/jbelmont/containerized-golang-and-vuejs/model"
)

// User Struct is the model for the app
type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Gender    string `json:"gender"`
}

// Conn returns redis connection
type Conn struct {
	RedisSession redis.Conn
}

const (
	localDial = "localhost:6379"
	redisURL  = "REDIS_URL"
	users     = "users"
)

var (
	dockerDial = os.Getenv(redisURL)
)

func getDial() string {
	var dial string
	if os.Getenv(redisURL) == "redis" {
		dial = os.Getenv(redisURL)
	} else {
		dial = localDial
	}
	return dial
}

// Users is a slice of User
type Users []User

var connect redis.Conn

// SetKey sets a redis key
func SetKey(key string, data interface{}) {
	connect := Connect()
	if data == nil {
		log.Println("should not be nil")
	}
	_, err := connect.Do("SET", key, data)
	if err != nil {
		log.Fatal(err, "not ok")
	}
	defer connect.Close()
}

// GetKey returns a redis value
func GetKey(key string) (interface{}, error) {
	connect := Connect()
	reply, err := connect.Do("GET", key)
	if err != nil {
		return nil, err
	}
	return reply, err
}

func DeleteKey(key string) (interface{}, error) {
	connect := Connect()
	reply, err := connect.Do("DEL", key)
	if err != nil {
		log.Fatal(err, "Did not delete key")
	}
	return reply, err
}

// GetKeys using KEYS redis command with pattern
func GetKeys(pattern string) (interface{}, error) {
	connect := Connect()
	reply, err := connect.Do("KEYS", pattern)
	if err != nil {
		return nil, err
	}
	return reply, err
}

// SetHash sets a redis hash set
func SetHash(key string, data model.UserModel) (interface{}, error) {
	connect := Connect()
	reply, err := connect.Do("HMSET", key, "id", data.ID, "firstname", data.FirstName, "lastname", data.LastName, "email", data.Email, "gender", data.Gender)
	if err != nil {
		log.Fatal(err, "not ok")
	}
	return reply, err
}

// GetHashAll returns redis hash
func GetHashAll(key string) (interface{}, error) {
	connect := Connect()
	rep, err := connect.Do("HGETALL", key)
	if err != nil {
		log.Fatal(err, "not ok")
	}
	defer connect.Close()
	return rep, err
}

// GetStrings returns a slice of strings
func GetStrings(reply interface{}, err error) ([]string, error) {
	strings, err := redis.Strings(reply, err)
	return strings, err
}

// GetStringMap returns a map
func GetStringMap(result interface{}, err error) (map[string]string, error) {
	hashVal, err := redis.StringMap(result, err)
	return hashVal, err
}

// Connect returns redis connection
func Connect() redis.Conn {
	var err error
	connect, err = redis.Dial("tcp", getDial())
	if err != nil {
		return nil
	}
	return connect
}
