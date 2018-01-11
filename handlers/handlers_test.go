package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestUsersIndex(t *testing.T) {
	handler := http.HandlerFunc(UsersIndex)

	r := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, r)

	if w.Code != http.StatusOK {
		t.Errorf("Should receive a status code of 200 for the response : %v", w.Code)
	}
}
