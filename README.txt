
hi-scor.es
==========

Code for the website http://hi-scor.es.

to build:
docker build -t hiscores ./

to run in dev mode:
docker run -itp 80:80 -v 'localdir':'/usr/local/src/hiscores':ro hi-scor.es bin/bash

