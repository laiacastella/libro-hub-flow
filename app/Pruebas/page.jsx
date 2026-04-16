"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { PopUp, Comentarios } from "@/components/index.js";
import { BookHeadphones, Angry, Apple } from "lucide-react";

export default function RegistroPage() {
    const [form, setForm] = useState({
        nick_usuario: "",
        email: "",
        password: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        id_provincia: "",
        id_poblacion: "",
    });
    const [mensaje, setMensaje] = useState("");

    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState("");
    const [urlImagen, setUrlImagen] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    password_hash: form.password,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                setMensaje("Error: " + data.error);
                return;
            }

            const usuarioId = data.id_usuario;
            setMensaje("Usuario creado con ID: " + usuarioId);

            if (archivo) {
                const formData = new FormData();
                formData.append("archivo", archivo);

                const resUpload = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const dataUpload = await resUpload.json();

                if (dataUpload.status_code === 200) {
                    const displayUrl = dataUpload.image.display_url;
                    setUrlImagen(displayUrl);

                    await fetch("/api/usuarios/foto", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id_usuario: usuarioId,
                            foto_perfil: displayUrl,
                        }),
                    });

                    setMensaje("Usuario creado y foto subida correctamente");
                } else {
                    setMensaje("Usuario creado, pero error al subir imagen");
                    console.log(dataUpload);
                }
            }
        } catch (err) {
            console.error(err);
            setMensaje("Error al crear usuario");
        }
    };

    const [open, setOpen] = useState(false);

    return (
        <>

            <button onClick={() => setOpen(true)}>Abrir PopUp</button>

            <PopUp
                isOpen={open}
                onClose={() => setOpen(false)}
                popupClassName="mi-popup"
            >
                <h2>Eliminar libro</h2>
                <p>¿Seguro que quieres eliminarlo?</p>

                <button onClick={() => setOpen(false)}>Cancelar</button>
                <button onClick={() => alert("Eliminado")}>Confirmar</button>
            </PopUp>


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        MiWeb
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Productos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap"></use>
                            </svg>{" "}
                        </Link>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <a href="#" className="nav-link px-2 link-secondary">
                                    Overview
                                </a>
                            </li>{" "}
                            <li>
                                <a href="#" className="nav-link px-2 link-body-emphasis">
                                    Inventory
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-2 link-body-emphasis">
                                    Customers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-2 link-body-emphasis">
                                    Products
                                </a>
                            </li>{" "}
                        </ul>
                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {" "}
                                <Image src="https://github.com/mdo.png" alt="mdo" width={32} height={32} className="rounded-circle" unoptimized />{" "}
                            </a>{" "}
                            <ul className="dropdown-menu text-small">
                                {" "}
                                <li>
                                    <a className="dropdown-item" href="#">
                                        New project...
                                    </a>
                                </li>{" "}
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Settings
                                    </a>
                                </li>{" "}
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Profile
                                    </a>
                                </li>{" "}
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>{" "}
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Sign out
                                    </a>
                                </li>{" "}
                            </ul>{" "}
                        </div>{" "}
                        <p className="align-center px-2 mb-0 text-emerald-600 font-bold text-lg md:text-2xl leading-none">Hola, Nombre Apellido</p>
                    </div>{" "}
                </div>{" "}
            </header>
            <button className="btn btn-success">Guardar</button>
            <div className={styles.container}>
                <h1 className={styles.title}>Registro de Usuario</h1>

                <form onSubmit={handleSubmit}>
                    <input className={styles.inputField} name="nick_usuario" placeholder="Nick" value={form.nick_usuario} onChange={handleChange} required />
                    <input className={styles.inputField} name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                    <input className={styles.inputField} name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
                    <input className={styles.inputField} name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                    <input className={styles.inputField} name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
                    <input className={styles.inputField} name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
                    <input className={styles.inputField} name="id_provincia" placeholder="ID Provincia" type="number" value={form.id_provincia} onChange={handleChange} />
                    <input className={styles.inputField} name="id_poblacion" placeholder="ID Población" type="number" value={form.id_poblacion} onChange={handleChange} />

                    <input className={styles.inputField} type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && (
                        <div className={styles.previewContainer}>
                            <Image src={preview} alt="Preview" width={300} height={300} className={styles.previewImage} unoptimized />
                        </div>
                    )}

                    <button className={styles.button} type="submit">
                        Registrar
                    </button>
                </form>

                {mensaje && <p className={styles.message}>{mensaje}</p>}

                {urlImagen && (
                    <div className={styles.previewContainer}>
                        <h4>Imagen subida:</h4>
                        <Image src={urlImagen} alt="Foto subida" width={300} height={300} className={styles.previewImage} unoptimized />
                        <p>
                            <a className={styles.link} href={urlImagen} target="_blank" rel="noopener noreferrer">
                                Abrir en otra pestaña
                            </a>
                        </p>
                    </div>
                )}
            </div>
            <div className={styles.pruebaCometarioContenedor}>
                <Comentarios />
            </div>

            {/*Codigo carrusel Inicio*/}
            <div id="carouselExample" className="carousel slide pointer-event">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <svg aria-label="Placeholder: First slide" className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" height="400" preserveAspectRatio="xMidYMid slice" role="img" width="800" xmlns="http://www.w3.org/2000/svg">
                            <title>BookHeadphones</title>
                            <rect width="100%" height="100%" fill="#666"></rect>
                            <BookHeadphones x="50%" y="50%" fill="#ffffff" />
                        </svg>
                    </div>

                    <div className="carousel-item">
                        <svg aria-label="Placeholder: Second slide" className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" height="400" preserveAspectRatio="xMidYMid slice" role="img" width="800" xmlns="http://www.w3.org/2000/svg">
                            <title>Angry</title>
                            <rect width="100%" height="100%" fill="#666"></rect>
                            <Angry x="50%" y="50%" fill="#ffffff" />
                        </svg>
                    </div>

                    <div className="carousel-item">
                        <svg aria-label="Placeholder: Third slide" className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" height="400" preserveAspectRatio="xMidYMid slice" role="img" width="800" xmlns="http://www.w3.org/2000/svg">
                            <title>Apple</title>
                            <rect width="100%" height="100%" fill="#555"></rect>
                            <Apple x="50%" y="50%" fill="#ffffff" />
                        </svg>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/*Codigo carrusel Final*/}
        </>
    );
}
