package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/garyburd/redigo/redis"
	"github.com/jbelmont/containerized-golang-and-vuejs/model"
)

// UsersIndex returns index page with users
func UsersIndex(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "")
}

// User Struct is the model for the app
type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Gender    string `json:"gender"`
}

// Connect returns redis connection
func Connect() redis.Conn {
	var err error
	connect, err := redis.Dial("tcp", os.Getenv("REDIS_URL"))
	if err != nil {
		return nil
	}
	return connect
}

// GetUsers returns json payload with users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []model.Users
	var payload []byte
	var err error
	connect := Connect()
	reply, err := connect.Do("KEYS", "user:*")
	values, _ := redis.Strings(reply, err)
	if values != nil {
		var users2 []User
		var user User
		for _, val := range values {
			hash, err := connect.Do("HGETALL", val)
			if err != nil {
				log.Fatal(err, "not ok")
			}
			hashVal, _ := redis.StringMap(hash, err)
			id, _ := strconv.Atoi(hashVal["id"])
			user = User{
				ID:        id,
				FirstName: hashVal["firstname"],
				LastName:  hashVal["lastname"],
				Email:     hashVal["email"],
				Gender:    hashVal["gender"],
			}
			users2 = append(users2, user)
		}
		payload, err = json.Marshal(users2)
	} else {
		users = model.GetUsers()
		payload, err = json.Marshal(users)
	}

	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(payload)
}

// AddUser add a new user to database
func AddUser(w http.ResponseWriter, r *http.Request) {
	var u User
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	fmt.Println(w)
}
