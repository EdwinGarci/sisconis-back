## GitFlow Simplificado para SISCONIS

Este proyecto utiliza una versión simplificada de GitFlow que incluye las ramas `main`, `develop` y `feature`.

### Estructura de Ramas:

* `main`: Solo versiones estables, listas para producción.
* `develop`: Integración de todas las funcionalidades que están listas para ser probadas.
* `feature/*`: Nuevas funcionalidades, refactorizaciones o fixes específicos.

---

### Creación de Ramas

1. **Crear la rama `develop`:**

```bash
# Asegurarse de estar en main
git checkout main

# Crear y cambiar a develop
git checkout -b develop

# Subirla al remoto
git push -u origin develop
```

---

2. **Crear una rama `feature`**

Todas las ramas `feature` deben crearse a partir de `develop`. Se recomienda la siguiente estructura:

```bash
# Crear una nueva feature
git checkout -b feature/<nombre> develop
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

Cuando una `feature` está lista, debe integrarse a `develop`:

1. Cambiar a `develop`:

```bash
git checkout develop
```

2. Hacer pull de los últimos cambios:

```bash
git pull
```

3. Hacer el merge:

```bash
git merge feature/<nombre>
```

4. Resolver conflictos, hacer commit y push:

```bash
git push origin develop
```

---

### Consideraciones Finales:

### Flujo de trabajo recomendado para ramas feature

1. Crear la rama `feature` basada en `develop`:

```bash
git checkout -b feature/<nombre> develop
```

Ejemplo para trabajar en los modelos del domain:

```bash
git checkout -b feature/domain-models develop
```

2. Al finalizar el trabajo, integrar los cambios a `develop`:

```bash
# Cambiar a develop
git checkout develop

# Actualizar develop
git pull

# Mergear la rama feature
git merge feature/domain-models

# Empujar los cambios a develop
git push origin develop
```

3. Eliminar la rama `feature` local y remotamente:

```bash
# Localmente
git branch -d feature/domain-models

# Remotamente
git push origin --delete feature/domain-models
```

4. Crear la nueva rama `feature` para el siguiente módulo o capa:

```bash
git checkout -b feature/domain-repositories develop
```

Este flujo asegura mantener `develop` actualizado sin ramas innecesarias flotando en el repositorio.

* Se deben mantener los nombres de las ramas claros y concisos.
* Se deben realizar commits pequeños y específicos.
* Se debe documentar los cambios en el `docs/git-flow.md` para mantener un registro del flujo.
* Se debe revisar constantemente las ramas para evitar conflictos grandes al hacer merges.