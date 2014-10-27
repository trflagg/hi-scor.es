FROM nginx:1.7.6
COPY client /usr/share/nginx/html
COPY DarwinDefenders /usr/share/nginx/html/darwin_defenders
COPY TinyCampbell/TinyCampbell/build /usr/share/nginx/html/tiny_world_machine
