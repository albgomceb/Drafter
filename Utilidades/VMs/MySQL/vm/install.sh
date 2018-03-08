wget https://get.docker.com/
sudo sh index.html

sudo docker pull mysql/mysql-server:5.7
sudo docker run --name=mysql -p 3306:3306 -e MYSQL_DATABASE='dev_db' -e MYSQL_ROOT_HOST='%' -e MYSQL_ROOT_PASSWORD='1234' -d mysql/mysql-server:5.7