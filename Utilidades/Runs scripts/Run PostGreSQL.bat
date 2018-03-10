@echo off
cd ../../back-end/target/

set AUTO=validate
set DATABASE=jdbc:postgres://root:1234^@127.0.0.1:5432/dev_db
set DATABASE_USER=root
set DATABASE_PASS=1234
set DIALECT=org.hibernate.dialect.PostgreSQLDialect

java -jar drafter-1.0.jar

pause