BIN_DIR := "bin/trilug"

all:	ensure	package

.PHONY:	generate-coverage

ensure:
				dep ensure

package:	compile

compile:	main.go
						CGO_ENABLED=0 go build -i -o ${BIN_DIR} main.go

dev-deps:
					docker-compose pull

build-dev:
						docker-compose build

dev:
			docker-compose up frontend backend db redis

destroy-dev:
							docker-compose down

show-containers:
									docker-compose ps

test:
				go test ./... -v

travis-before-build:	travis-before-build-step

travis-before-build-step:
														export PATH=${PATH}:${HOME}/gopath/bin
														go get -u golang.org/x/tools/cmd/cover
														go get -u github.com/golang/dep/cmd/dep
														go get -u github.com/sozorogami/gover
														go get -u github.com/mattn/goveralls

travis-build-step:
											dep ensure

travis-script-step:
											set -e
											CGO_ENABLED=0 go build -i -o ${BIN_DIR} *.go
											go test ./...
											gover
											goveralls -coverprofile=gover.coverprofile -service drone.io -repotoken ${COVERALLS_TOKEN}
