--Nombre del proyecto.--
# MISAPIS_TUTI_DB


--Instrucciones para la instalación y ejecución del backend.--
# 1. Requisitos previos
Antes de iniciar, hay que tener instalado:

* Node.js (v16 o superior) 
* MongoDB 
* Git
  
# 2. Clonar o descargar el proyecto
Usando el Git clonanos el repositorio:
  git clone https://github.com/RubenOverney/MISAPIS_TUTI_DB.git

# 3. Instalar dependencias
Ejecutamos en la terminal:
  npm install ---> Esto instalará todos los paquetes listados en package.json.

# 4. Configurar variables de entorno
El backend utiliza un archivo .env para definir la conexión a MongoDB y otras configuraciones.<br>
  Creamos un archivo .env en la raíz del proyecto y agrega:

    MONGO_URI=mongodb+srv://overney:12345@overney.tegjgd3.mongodb.net/?appName=Overney/misapis 
    PORT=3000

# 5. Configurar la base de datos
El archivo:
  db/cnn_mongodb.js -----> se encarga de conectar con MongoDB automáticamente cuando inicias el servidor.

# 6. Ejecutar el servidor
Iniciamos el backend con:
  npm start

# 7. Verificar que el backend está funcionando
Abrimos un navegador o Postman e ingresamos a una ruta de prueba:

  http://localhost:3000/api/tuti
  
Si todo está correcto, deberiamos ver un JSON o un arreglo vacío y este se encarga de conectar con MongoDB automáticamente cuando inicias el servidor.

#
--Descripción de las rutas de la API.--
# Estructura relacionada con las rutas

*routes/

    *index.routes.js → Archivo principal que agrupa todas las rutas de la API.
    *tuti.routes.js → Contiene las rutas específicas del recurso Tuti.
*controllers/

    *tuti.controller.js → Contiene la lógica de negocio que ejecutan las rutas.
*models/

    *tuti.model.js → Define la estructura del documento en la base de datos MongoDB.
*db/

    *cnn_mongodb.js → Conexión con MongoDB.
*server/

    *server.js → Configura Express, middlewares y el uso de las rutas.
