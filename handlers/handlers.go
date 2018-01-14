package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"strconv"

	"gopkg.in/mgo.v2/bson"

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
	var u model.UserModel
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	userModel := model.UserModel{
		ID:        u.ID,
		FirstName: u.FirstName,
		LastName:  u.LastName,
		Email:     u.Email,
		Gender:    u.Gender,
	}
	context := model.GetContext()
	c := context.DBCollection()
	err2 := c.Insert(&userModel)
	if err2 != nil {
		log.Fatal("error saving user")
		return
	}
	connect := Connect()
	key := "user:" + strconv.Itoa(u.ID)
	_, err3 := connect.Do("HMSET", key, "id", u.ID, "firstname", u.FirstName, "lastname", u.LastName, "email", u.Email, "gender", u.Gender)
	if err3 != nil {
		log.Fatal("Redis did not save value")
	}
	code := struct {
		StatusCode int
	}{
		200,
	}
	payload, err3 := json.Marshal(code)
	if err3 != nil {
		log.Fatal("Something went wrong marshalling")
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(payload)
}

// GetUserByID returns a user from mongo
func GetUserByID(w http.ResponseWriter, r *http.Request) {
	var id map[string]string
	err := json.NewDecoder(r.Body).Decode(id)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	var result model.UserModel
	context := model.GetContext()
	c := context.DBCollection()
	user := c.Find(bson.M{"id": id["id"]}).All(&result)
	payload, err2 := json.Marshal(user)
	if err2 != nil {
		log.Fatal("Something went wrong marshalling")
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(payload)
}

// DeleteUserByID deletes a user by id
func DeleteUserByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		log.Fatal("Error trying to convert id to int")
	}
	context := model.GetContext()
	c := context.DBCollection()
	removeUserErr := c.Remove(bson.M{"id": id})
	if removeUserErr != nil {
		http.Error(w, removeUserErr.Error(), 500)
		return
	}
	connect := Connect()
	key := "user:" + strconv.Itoa(id)
	_, deleteRedisUser := connect.Do("DEL", key)
	if deleteRedisUser != nil {
		http.Error(w, deleteRedisUser.Error(), 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
}
