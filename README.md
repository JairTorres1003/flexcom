# Flexcom

Pasos para ejecutar el proyecto...
 1. Instalar dependencias
 <code>npm install</code>

#### Ejecucion en Escritorio

 1. En la terminal Compilar el codigo de React
 <code>npm run watch</code>
 2. En otra terminal Ejecutar la aplicación de Electron
 <code>npm start</code>

#### Ejecucion en Web

Comentar
 1. script linea 18
 <code>public\index.html</code>
 2. TitleBar linea 11
 <code>src\App.js</code>
 3. lineas 11, 15 y 18
 <code>src\pages\TitleBar\TitleBar.js</code>
 4. Estilos de border linea 11
 <code>src\styles\global.css</code>
 5. Estilos de border lineas 10 y 23
 <code>src\pages\Home\Home.css</code>
 6. Estilos de border linea 23
 <code>src\components\Menu\Menu.css</code>

<!--
#### Dependencias electron

 1. electron
 3. electron-reload
 2. concurrently
 3. wait-on
-->