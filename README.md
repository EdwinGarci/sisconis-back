# SISCONIS Back

**SISCONIS** es el acrónimo de **Sistema de Control de Ingresos y Salidas**. Este proyecto es una implementación backend para gestionar papeletas de permisos de salida o ingreso a una institución. Está desarrollado utilizando Node.js y siguiendo una arquitectura limpia (clean architecture), organizada en capas: `presentation`, `domain`, `infrastructure` y `application`.

Este sistema fue originalmente iniciado en un trabajo anterior, pero no se llegó a finalizar. Ahora lo he retomado, actualizado con nuevas tecnologías, y lo estoy llevando a término como parte de mi aprendizaje continuo.

## Características

- Gestión de permisos de ingreso y salida.
- Registro y autenticación de usuarios.
- Roles y permisos para diferentes niveles de usuario.
- API RESTful documentada.
- Diseño modular y escalable gracias a la arquitectura limpia.
- Fácil integración con bases de datos y servicios externos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework para manejar las solicitudes HTTP.
- **Arquitectura Limpia**: Organización del código en capas para mantener una alta cohesión y bajo acoplamiento.
- **Docker**: Para facilitar la configuración y despliegue.
- **Base de Datos**: Integración con bases de datos SQL (PostgreSQL).
- **Pruebas**: Configuración inicial para Jest.

## Estructura del Proyecto

El proyecto sigue la estructura de una arquitectura limpia:
```
src/
├── presentation/     # Controladores, rutas y middleware
│   # Maneja la capa de presentación y la interfaz con el usuario
│   # Incluye controladores HTTP, definiciones de rutas y middleware
│
├── domain/          # Entidades y reglas de negocio
│   # Contiene las entidades centrales del negocio
│   # Define las reglas y lógica core del dominio
│
├── application/     # Casos de uso y lógica de aplicación
│   # Implementa los casos de uso específicos
│   # Orquesta el flujo de datos entre la capa de presentación y dominio
│
└── infrastructure/  # Conexiones con la base de datos y servicios externos
    # Implementa el acceso a recursos externos
    # Maneja la persistencia y servicios de terceros
```

## Instalación

1. Clonar el repositorio:

```
https://github.com/EdwinGarci/sisconis-back.git
cd sisconis-back
```

2. Crear el archivo de configuración:

```
cp .env.template .env
```
Configura las variables de entorno según tu entorno local.

3. Instalar las dependencias:

```
npm install
```

4. Configurar servicios adicionales (opcional): Si necesitas levantar la base de datos u otros servicios, edita el archivo docker-compose.yml y ejecuta:

```
docker-compose up -d
```

5. Inicializar la base de datos:

```
npm run seed
```

6. Ejecutar el servidor en modo desarrollo:

```
npm run dev
```

## Endpoints

Próximamente se incluirá una página dedicada a la documentación completa para desarrolladores y usuarios finales. Mientras tanto, algunos ejemplos básicos:

- `GET /users`: Obtiene la lista de usuarios.
- `POST /users`: Crea un nuevo usuario.
- `DELETE /users/:id`: Elimina un usuario específico.

Documentación completa será generada con **Swagger** o compartida en una colección de **Postman**.

## Pruebas
Para ejecutar las pruebas:

```
npm test
```

## Estado del Proyecto

Actualmente, este proyecto está en desarrollo. Próximos pasos:

- Completar la implementación del backend.
- Crear el frontend en un repositorio separado.
- Documentar los endpoints con Swagger/Postman.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por visitar este repositorio! Si tienes alguna sugerencia, no dudes en abrir un issue o contactarme.

### Filosofía

"Automatiza y organiza como si fueras un equipo de 5, pero actúa con la velocidad de uno solo."