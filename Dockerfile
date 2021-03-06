FROM nginx:1.7.6
COPY client /usr/share/nginx/html
COPY DarwinDefenders /usr/share/nginx/html/darwin_defenders
COPY TinyCampbell/TinyCampbell/build /usr/share/nginx/html/tiny_world_machine
COPY P27 /usr/share/nginx/html/p27
COPY SolidGround /usr/share/nginx/html/solid_ground
COPY TheDiskOfPhaistos /usr/share/nginx/html/disk_of_phaistos
