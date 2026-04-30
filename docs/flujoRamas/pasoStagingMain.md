
# 🔍 Paso a `staging`

Cuando varias tareas estén integradas y el equipo lo revise:

Pull Request:

```text
develop → staging
```

En `staging` revisamos:

* funcionamiento general
* integración entre módulos
* bugs no detectados en local
* experiencia de usuario
* responsive
* rendimiento básico
* detalles visuales

---

# 🚀 Paso a producción

Si `staging` está validada:

```text
staging → main
```

Al mergear en `main`, Vercel desplegará la versión de producción.

Es la versión que verá el cliente final.