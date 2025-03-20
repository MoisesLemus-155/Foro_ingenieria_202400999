import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { comentar, listaPublicaciones } from "./Publicaciones/Api/ApiPublicaciones";

export const PantallaInicial = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [publicaciones, setPublicaciones] = useState([])
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mensaje: "",
        publicacion_id: "",
    });

    const listaPublicacionesView = async () => {
        try {
            const publisResponse = await listaPublicaciones();
            console.log("Respuesta completa de la API:", publisResponse);

            if (publisResponse && Array.isArray(publisResponse.data)) {
                setPublicaciones(publisResponse.data); // Accede al array dentro de data
            } else {
                console.error("Error: la respuesta no contiene un array en 'data'", publisResponse);
                setPublicaciones([]);
            }
        } catch (error) {
            console.error("Error al obtener publicaciones:", error);
            setPublicaciones([]);
        }
    };

    const handleComentario = async (e, publicacionId) => {
        e.preventDefault();

        if (!formData.mensaje.trim()) {
            alert("El comentario no puede estar vacío.");
            return;
        }

        const result = await comentar(formData.mensaje, publicacionId); // Enviar el id correcto

        if (result) {
            Swal.fire({
                icon: "success",
                title: "PERFECTO!",
                text: "Comentario publicado!",
                confirmButtonText: '<span class= "btn-swal">OK</span>',
            });

            // Recargar publicaciones para mostrar el nuevo comentario
            listaPublicacionesView();

            // Limpiar el campo de comentario
            setFormData({ ...formData, mensaje: "" });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        listaPublicacionesView();
    }, []);

    // Función de búsqueda
    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.trim() === "") return;

        try {
            const response = await fetch(`http://localhost:5000/search?query=${search}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="container-navbar">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <button className="btn navbar-brand" onClick={() => {navigate('/')}}>Cerrar Sesion</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="btn navbar-brand active" aria-current="page" href="#">Ver Perfil</a>
                                </li>
                                <li className="nav-item">
                                    <button className=" btn navbar-brand active" onClick={() =>{navigate('/CreatePublicacion')}}>Hacer una Publicacion</button>
                                </li>
                                <li className="nav-item">
                                    {/* <a className="nav-link" href="#">Buscar</a> */}
                                    <div className="buscador m-1">
                                        <form onSubmit={handleSearch}>
                                            <button type="submit">Buscar</button>
                                            <input
                                                type="text"
                                                placeholder="Buscar publicaciones..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="container-publis">
                <div className="publis">
                    {publicaciones.map((p) => {
                        return (
                            <div className="card-public" key={p.publicacion_id}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6">
                                            <strong>Usuario:</strong> {p.usuario_id}
                                        </div>
                                        <div className="col-6 text-end">
                                            <strong>Fecha:</strong> {new Date(p.publicacion_fecha).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"><strong>Catedratico:</strong> {p.profesor_nombres}, {p.profesor_apellidos}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"><strong>Curso:</strong> {p.curso_nombre}, <strong>Seccion: </strong> {p.curso_seccion}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"><strong>Descripcion:</strong> {p.publicacion_mensaje}</div>
                                    </div>
                                    {/* Sección de Comentarios */}
                                    <div className="comentarios">
                                        <h6 className="mt-4">Comentarios:</h6>
                                        {p.comentarios.length > 0 ? (
                                            p.comentarios.map((comentario) => (
                                                <div key={comentario.comentario_id} className="comentario">
                                                    <strong>Usuario {comentario.usuario_id}:</strong> {comentario.mensaje}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No hay comentarios aún.</p>
                                        )}
                                        <form onSubmit={(e) => handleComentario(e, p.publicacion_id)}>
                                            <input
                                                type="text"
                                                placeholder="Escribe un comentario..."
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                name="mensaje"
                                            />
                                            <button className="btn btn-primary m-2" type="submit">Comentar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
