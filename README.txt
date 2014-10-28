
hi-scor.es
==========

Code for the website http://hi-scor.es.

to build:
    docker build -t hiscores ./

to run in dev mode:
    docker run -itp 80:80 -v 'localdir':'/usr/local/src/hiscores':ro hi-scor.es bin/bash

to run in production:
    sudo docker run --name='hiscores' --publish=80:80 -d hiscores
