## GitFlow Simplificado para SISCONIS

Este proyecto adopta una versión simplificada de GitFlow que utiliza las ramas `main`, `develop`, `integration` y `feature/*`.

### Estructura de Ramas

* `main`: Contiene únicamente versiones estables y listas para producción.
* `develop`: Rama base estable que incluye funcionalidades preparadas para pruebas finales.
* `integration`: Sirve como punto de integración de múltiples ramas `feature/*`, donde se resuelven errores antes de ser promovidas a `develop`.
* `feature/*`: Ramas destinadas al desarrollo activo de nuevas funcionalidades, refactorizaciones o correcciones específicas.

---

### Creación de Ramas

1. **Creación de las ramas `develop` e `integration`**:

```bash
# Asegurarse de estar en main
git checkout main

# Crear develop
git checkout -b develop

# Crear integration desde develop
git checkout -b integration

# Subirlas al repositorio remoto
git push -u origin develop
git push -u origin integration
```

---

2. **Creación de una rama `feature`**

Todas las ramas `feature` deben crearse a partir de `integration`. Se recomienda seguir la siguiente estructura:

```bash
# Crear una nueva feature
git checkout -b feature/<nombre> integration
```

Ejemplos de nombres:

* `feature/domain-models`
* `feature/domain-repositories`
* `feature/application-use-cases`
* `feature/infrastructure-db-setup`
* `feature/presentation-auth-controller`

---

### Reglas para Commits

Formato sugerido:

```
<tipo>(<capa>): <mensaje>
```

Tipos comunes:

* `feat`: Nueva funcionalidad
* `fix`: Corrección de errores
* `refactor`: Refactorización sin cambiar funcionalidad
* `test`: Creación o modificación de tests
* `chore`: Tareas menores (ej. actualización de dependencias)

Ejemplos:

* `feat(domain): add User model`
* `fix(application): correct validation in auth use-case`
* `test(infrastructure): add tests for DB connection`

---

### Integración de Feature a Develop

Cuando una rama `feature` está lista, debe integrarse a `develop` siguiendo estos pasos:

1. Cambiar a `develop`:

```bash
git checkout develop
```

2. Obtener los últimos cambios:

```bash
git pull
```

3. Realizar el merge:

```bash
git merge feature/<nombre>
```

4. Resolver conflictos, hacer commit y push:

```bash
git push origin develop
```

---

### Flujo de Trabajo Recomendado para Ramas Feature

1. Crear la rama `feature` desde `integration`:

```bash
git checkout -b feature/<nombre> integration
```

2. Trabajar libremente en la rama, incluyendo pruebas, correcciones y ajustes.

3. Una vez finalizada, integrar la `feature` a `integration`:

```bash
git checkout integration
git pull
git merge feature/<nombre>
git push origin integration
```

4. Eliminar la rama:

```bash
git branch -d feature/<nombre>
git push origin --delete feature/<nombre>
```

5. Cuando `integration` esté estable, fusionarla con `develop`:

```bash
git checkout develop
git pull
git merge integration
git push origin develop
```

6. Finalmente, al validar todo, pasar `develop` a `main`:

```bash
git checkout main
git pull
git merge develop
git push origin main
```

---

### Consideraciones Finales

* Las ramas `feature/*` son un entorno libre para desarrollar y experimentar.
* La rama `integration` actúa como una sala de pruebas antes de llegar a `develop`.
* `develop` representa una base segura previa a producción.
* La rama `main` debe reservarse exclusivamente para versiones finales listas para producción.

Este flujo busca mantener orden y claridad, ideal para un entorno con un solo desarrollador que trabaje con mentalidad de equipo.
