# Resumen herramientas para desarrollo
Para preparar el entorno de desarrollo se necesitrán tener instaladas las siguientes herramientas (sino estuvieran instaladas ya):
## 1) Para las bases de datos
* **[VirtualBox](https://www.virtualbox.org/wiki/Downloads)**
* **[Vagrant](https://www.vagrantup.com/downloads.html):** Una vez instalado, ejecuta una terminal el comando ```vagrant plugin install vagrant-vbguest```. Reinicia tu máquina para terminar la instalación.

## 2) Lenguajes de programación
* **[JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)**
* **[Node.js](https://nodejs.org/es/)** (Te instala NPM)

## 3) IDES
Este apartado dependerá de las preferencias de cada usuario, las herramientas que se muestran aquí son solo recomendaciones, cualquier otras son válidas:
* **[Eclipse](https://www.eclipse.org/downloads/packages/eclipse-ide-java-developers/oxygen2):** Se recomienda usar siempre la última versión. Se recomienda o usar la versión normal para [Java](https://www.eclipse.org/downloads/packages/eclipse-ide-java-developers/oxygen2) (no la EE, es muy pesada y lenta) ó la versión para [Spring](https://spring.io/tools/sts).
* **[VS Code](https://code.visualstudio.com/):** Este es el IDE de Microsoft, por tanto, es el que mejor se integra con TypeScript. Se recomienda instalar los plugins Auto Import y Path Autocomplete, sino vinieran ya.

## 4) Librerías
Una vez lo tengas todo, ejecuta el comando:
```
npm install -g @angular/cli
```
Con el cual instalaremos las dependencias para Angular. Una vez termine, metete el la carpeta del repositorio llamada ```front-end``` medianto consola con el uso del comando ```cd```. Una vez ahí, ejecuta el comando: 
```
npm install
```
Y así tendremos ya instaladas las dependencias de Angular.
