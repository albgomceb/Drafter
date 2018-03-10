@echo off
cd ../../back-end/target/

set AUTO=validate
set DATABASE=jdbc:mysql://127.0.0.1:3306/dev_db?user=root^&password=1234
set DATABASE_USER=root
set DATABASE_PASS=1234
set DIALECT=org.hibernate.dialect.MySQL5Dialect

java -jar drafter-1.0.jar

pause