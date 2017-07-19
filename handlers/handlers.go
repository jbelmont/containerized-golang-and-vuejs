package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

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

// GetUsers returns json payload with users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []model.Users
	var payload []byte
	var err error
	users = model.GetUsers()
	payload, err = json.Marshal(users)

	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(payload)
}

// AddUser add a new user to database
func AddUser(w http.ResponseWriter, r *http.Request) {
	payload, err := json.Marshal([]string{
		"hey", "whats", "up",
	})
	if err != nil {
		fmt.Println("something went wrong")
	}
	w.Write(payload)
}
