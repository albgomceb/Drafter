wget https://get.docker.com/
sudo sh index.html

sudo docker pull docker pull postgres:10.3
sudo docker run --name=postgres -p 5432:5432 -e POSTGRES_DB='dev_db' -e POSTGRES_USER='root' -e POSTGRES_PASSWORD='1234' -d postgres:10.2