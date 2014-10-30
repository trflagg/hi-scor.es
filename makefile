
build:
	docker build -t hiscores ./

run-dev:
	docker run -itp 80:80 -v $(shell pwd):'/usr/local/src/hiscores':ro hiscores bin/bash

run:
	docker run --name='hiscores' --publish=80:80 -d hiscores
