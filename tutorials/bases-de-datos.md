# Preparar bases de datos en desarrollo
## Introducción
Para preparar nuestro entorno de desarrollo vamos a necesitar acceder a una base de datos. Puedes instalarte un gestor de bases de datos directamente en tu entorno, lo cual no se recomienda, o puedes seguir esta guía para instalarlo en máquinas virtuales que son mas cómodas porque se proporcionan ya configuradas y cuando ya no las necesites las borras de forma rápida.

Para dicha propuesta vamos a usar máquinas virtuales ya configuradas, proporcianadas en el propio repositorio, haciendo uso de un programa llamado Vagrant el cuál facilitará la instalación de estas. En caso de estar en alguna distribución de linux se recomienda usar Docker, ya que las VMs que se van a proporcionar lo usan internamente (se explicará al final).

## Requisitos
Para instalar las VMs necesitaras tener instalados los siguientes programas:
* **[VirtualBox](https://www.virtualbox.org/wiki/Downloads):** Este programa es el que ejecutará las VMs.
* **[Vagrant](https://www.vagrantup.com/downloads.html):** Instalar solo si no estás en linux, sino mejor usa Docker, como se explica abajo. Gracias a este programa podrás crear VMs ya configuradas a partir de archivos de texto. (Una vez instaldo reinicia tu máquina para que funcione)

Una vez instalado Vagrant hay que instalarle un plugin que se hace con el siguiente comando:
```
vagrant plugin install vagrant-vbguest
```
Para ejecutarlo, pegalo en una terminal y pulsa ```ENTER```.

## Funcionamiento
Vagrant lo que hace es crear máquinas vistuales a partir de un archivo de configuración y un script de aprovisionamiento. Esto quiere decir que, tenemos un script que configura la VM (puertos, carpeta compartida, SO, etc.) y otro que se encarga de instalar y configurar las herramientas que se van a usar dentro de ella. Como se ha mencionado, estos scripts se proporcionan listo para usarse.

Estas VMs se instalarán en VirtualBox y se quedarán ejecutandose en segundo plano, asi que no olvide pararlas cuando no les hagan falta, como se explacará después. Estas VMs funcionan como servicios a los cuales nos podemos conectar, por tanto, carecen de interfaz gráfica. Por lo general, una vez instaladas y ejecutandose, no habrá que preocuparse de nada más.

## Gestionar VMs
En la rama ```master``` en la carpeta ```Utilidades/VMs``` encontrarás varias carpetas. En cada carpeta vendrá todo lo nceseraio para gestionar una VM. En todas estas carpetas encontrarás los siguientes archivos:
* **start.bat:** Para empezar a ejecutar la VM, la primera vez que se ejecute necesitará descargar e instalar la VM, por eso tardará un rato en ejecutar.
* **stop.bat:** Cuando no necesitemos mas la VM, se recomienda pararla. Hagalo siempre ejecutando este archivo, nunca desde VirtualBox.
* **remote.bat:** Para acceder a la linea de comandos de la VM ejecutaremos este archivo, que controlará la VM mediante SSH. Aunque, por lo general, no necesitarás hacer nada aquí.
* **destroy.bat:** Elimina la VM, mostrando antes un mensaje de confirmación.

Por tanto, los pasos serían, primero ejecutar **start.bat** para instalar la VM (lo cuál llevará un tiempo). Una vez instalada estará lista para usar. Cuando no la necesites abierta ejecuta **stop.bat** y al día siguiente vuelvela a iniciar con **start.bat**, que solo tardará un par de segundos.

## Docker
Si estás en linux se recomienda usar Docker, asi que primero, nos lo instalamos ejecutando el comando:
```wget https://get.docker.com/ | sh```

Para instalar MySQL ejecuta estos comandos:
```
sudo docker pull mysql/mysql-server:5.7
sudo docker run --name=mysql -p 3306:3306 -e MYSQL_DATABASE='dev_db' -e MYSQL_ROOT_HOST='%' -e MYSQL_ROOT_PASSWORD='1234' -d mysql/mysql-server:5.7
```
Y para PostGresSQL:
```
sudo docker pull docker pull postgres:10.3
sudo docker run --name=postgres -p 5432:5432 -e POSTGRES_DB='dev_db' -e POSTGRES_USER='root' -e POSTGRES_PASSWORD='1234' -d postgres:10.2
```
Esto mantendrá el contenedor encendido hasta que que se apague tu máquina, o se apague el contenedor manualmente. Para volverlo a iniciar ejecuta:
```
sudo docker start postgres
```
ó
``````
sudo docker start mysql
``````