import '../CreatePubli.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const CreatePublicacion = () => {
    // Estado para los profesores
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState('');
    const [texto, setTexto] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProfesores = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cursos/profesores');
                console.log(response.data); // Verifica que los datos sean correctos
                setProfesores(response.data); // Asegúrate de que los datos sean un array de objetos
            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };
        obtenerProfesores();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProfesor || !texto) {
            setError('Por favor, seleccione un profesor y complete el texto.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/publis/publicar', {
                cat_o_curso: selectedProfesor,
                mensaje: texto
            });
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Publicación creada',
                    text: 'La publicación se ha creado correctamente',
                    confirmButtonText: 'OK'
                }).then((r) => {
                    setTexto('');
                    setSelectedProfesor('');
                    setError('');
                    if (r.isConfirmed) {
                        window.location.href = '/Inicio';
                    }
                });
            }
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            setError('Error al crear la publicación');
        }
    };



    return (
        <div className="body-publi">
            <div className="container-fluid publi-card">
                <div className="row">
                    <h2 className='m-3 text-center'>Crear Publicación</h2>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label-create-publi text-center mt-4'>Seleccionar Profesor:</label>
                            <select className='select-create-publi'
                                value={selectedProfesor}
                                onChange={(e) => setSelectedProfesor(e.target.value)}
                            >
                                <option value="">Selecciona un profesor</option>
                                {profesores.length > 0 ? (
                                    profesores.map((profesor) => (
                                        <option key={profesor.profesor_id} value={profesor.profesor_id}>
                                            {profesor.profesor_id} - {profesor.profesor_nombre}, {profesor.profesor_apellido} - {profesor.curso_nombre}
                                        </option>
                                    ))
                                ) : (
                                    <option>Cargando profesores...</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label className='label-create-publi text-center mt-4'>Texto de la Publicación:</label>
                            <textarea className='textarea-create-publi'
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                placeholder="Escribe tu publicación..."
                            />
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <button className='btn-create-publi' type="submit">Crear Publicación</button>
                    </form>
                </div>
                <button className='btn btn-primary mt-5' onClick={() => {navigate('/Inicio')}}>Regresar al Inicio</button>
            </div>
        </div>
    );
}
