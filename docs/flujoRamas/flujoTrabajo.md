# 👨‍💻 Flujo de trabajo del equipo

## 1. Crear rama desde `develop`

Antes de empezar hay queasegurarse de estar en la rama `develop` y seguidamente hacer:

```bash
git pull
git checkout -b feat/solicitudes/anadir-fecha-solicitud
```
Esto último te crea la rama y te cambia a ella.

## 2. Trabajar en la rama

* Hacer commits claros y pequeños.
* Probar localmente lo implementado antes de subir.
* Mantener la rama enfocada en una sola tarea.

## 3. Subir cambios y abrir Pull Request a `develop`

Cuando esté listo:

```bash
git push -u origin nombre-rama
```

Si quieres copiar y pegar el nombre de la rama, haz: 

```bash
git branch
```
y copias el nombre. (A veces para salir hay que hacer ctrl + C)

## 4. Pull Request

Cuando terminemos una funcionalidad:

Se crea una Pull Request (PR) desde la rama de trabajo (feat/*, fix/*, etc.)
La PR debe ir siempre hacia `develop`

⚠️ Importante: Asegurarse de que el destino sea `develop` y no `main` ni `staging`.

Antes de crear la PR, comprobar:

* El selector de rama destino (develop)
* La flecha superior que indica el flujo: feature → develop

## 5. Merge a `develop`

Si no hay errores notorios y todo funciona correctamente, se mergea.

Objetivo: evitar subir código roto o sin finalizar a la rama compartida, así si por lo que sea hay un error, no paralizamos a los demás compañeros.
