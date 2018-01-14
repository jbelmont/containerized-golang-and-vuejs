package redis

import (
	"strconv"
	"testing"

	"github.com/garyburd/redigo/redis"
	"github.com/stretchr/testify/assert"

	"github.com/jbelmont/containerized-golang-and-vuejs/model"
)

func TestSetKey(t *testing.T) {
	SetKey("names", []string{
		"billy", "john", "will",
	})
	reply, err := GetKey("names")
	if err != nil {
		t.Errorf("something wrong happened")
	}
	expected := "[billy john will]"
	actual, _ := redis.String(reply, err)
	if actual != expected {
		t.Errorf("should return %v", expected)
	}
}

func TestSetHash(t *testing.T) {
	testUser := []model.UserModel{
		model.UserModel{
			ID: 1, FirstName: "Timothy", LastName: "Cox", Email: "tcox0@dion.ne.jp", Gender: "Male",
		},
		model.UserModel{
			ID: 2, FirstName: "Sean", LastName: "Medina", Email: "smedina1@addthis.com", Gender: "Male",
		},
	}
	for key, user := range testUser {
		setName := "testuser:" + strconv.Itoa(key)
		SetHash(setName, user)
	}
}

// func TestGetHash(t *testing.T) {
// 	reply, err := GetHashAll("user:1")
// 	if err != nil {
// 		t.Error("should be nil")
// 	}
// 	strMap, _ := redis.StringMap(reply, err)
// 	testMap := map[string]string{
// 		"id":        "2",
// 		"firstname": "Sean",
// 		"lastname":  "Medina",
// 		"email":     "smedina1@addthis.com",
// 		"gender":    "Male",
// 	}
// 	if strMap["id"] != testMap["id"] {
// 		t.Errorf("%v and %v do not match", strMap["id"], testMap["id"])
// 	} else if strMap["firstname"] != testMap["firstname"] {
// 		t.Errorf("%v and %v do not match", strMap["firstname"], testMap["firstname"])
// 	} else if strMap["lastname"] != testMap["lastname"] {
// 		t.Errorf("%v and %v do not match", strMap["lastname"], testMap["lastname"])
// 	} else if strMap["email"] != testMap["email"] {
// 		t.Errorf("%v and %v do not match", strMap["email"], testMap["email"])
// 	} else if strMap["gender"] != testMap["gender"] {
// 		t.Errorf("%v and %v do not match", strMap["gender"], testMap["gender"])
// 	}
// }

func TestGetKeysWithPattern(t *testing.T) {
	var user User
	reply, err := GetKeys("user:*")
	values, _ := redis.Strings(reply, err)
	for _, val := range values {
		hash, err := GetHashAll(val)
		hashVal, _ := redis.StringMap(hash, err)
		id, _ := strconv.Atoi(hashVal["id"])
		user = User{
			ID:        id,
			FirstName: hashVal["firstname"],
			LastName:  hashVal["lastname"],
			Email:     hashVal["email"],
			Gender:    hashVal["gender"],
		}
		assert.IsType(t, user.ID, 5)
		if hashVal == nil {
			t.Errorf("%v should have map values", hashVal)
		}
	}
}

func TestDeleteKey(t *testing.T) {
	SetKey("DoStuff", "blah:1")
	reply, err := GetKey("DoStuff")
	if err != nil {
		t.Error("Did not get the key")
	}
	val, err2 := redis.String(reply, err)
	assert.Equal(t, val, "blah:1")
	if err2 != nil {
		t.Error("Not able to return the string")
	}
	reply2, err3 := DeleteKey("DoStuff")
	if err3 != nil {
		t.Error("Not able to delete the key")
	}
	assert.Equal(t, reply2, int64(1))
}
