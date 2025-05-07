# 
ls -ld docker-data/db
sudo chown -R $USER:$USER docker-data/db
chmod -R u+rwX docker-data/db

docker-compose -f docker-compose.dev.yml up --build
