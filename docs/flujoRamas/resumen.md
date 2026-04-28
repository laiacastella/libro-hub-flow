
# 🧭 Introducción al flujo de trabajo del proyecto

Este proyecto utiliza un sistema de ramas en Git pensado para trabajar en equipo de forma ordenada, evitando conflictos y asegurando que el código que llega a producción esté siempre revisado y estable.

La estructura se basa en tres ramas principales: `develop`, `staging` y `main`, cada una con un propósito claro dentro del ciclo de desarrollo.

* `develop` es la rama de trabajo diario, donde se integran las nuevas funcionalidades.
* `staging` se utiliza como entorno de pruebas y validación antes de producción.
* `main` representa la versión final del proyecto, conectada directamente con el entorno de producción en Vercel.

Además, el trabajo se organiza mediante ramas de tipo `feat/*`, `fix/*`, etc., que permiten desarrollar funcionalidades de forma aislada y ordenada antes de integrarlas en develop.

El objetivo de este flujo es trabajar en equipo sin interferir entre cambios, detectar errores antes de producción y mantener siempre una versión estable del proyecto.

# ✅ Resumen rápido

* Día a día

```text
Crear rama desde develop
Trabajar
PR a develop
```

* Release interna

```text
develop → staging
```

* Release cliente

```text
staging → main
```

---

# 🎯 Objetivo de este sistema

* Trabajar los 4 sin pisarnos cambios.
* Detectar errores antes de producción.
* Tener orden y trazabilidad.
* Entregar versiones estables al cliente.
* Poder crecer sin caos.
