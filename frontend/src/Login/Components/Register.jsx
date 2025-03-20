import { useState } from "react";
import Swal from "sweetalert2";
import "../Register.css";
import { apiRegister } from "../Api/ApiLogin";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        registroAcademico: "",
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "registroAcademico" && !/^[0-9]{0,9}$/.test(value)) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await apiRegister(
            formData.registroAcademico,
            formData.nombres,
            formData.apellidos,
            formData.correo,
            formData.password
        );
        if (success) {
            Swal.fire({
                icon: "success",
                title: "PERFECTO!",
                text: "Te has registrado con exito!",
                confirmButtonText: '<span class= "btn-swal">OK</span>',
            }).then((r) => {
                if (r.isConfirmed) {
                    window.location.href = "/";
                } else {
                    window.location.href = "/Register";
                }
            });
        }
    };

    return (
        <div className="body-register">
            <div className="container">
                <div className="register-box">
                    <h2>Registro de Usuario</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Registro Académico</label>
                            <input
                                type="text"
                                name="registroAcademico"
                                placeholder="Ingrese su registro (9 dígitos)"
                                value={formData.registroAcademico}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Nombres</label>
                            <input
                                type="text"
                                name="nombres"
                                placeholder="Ingrese sus nombres"
                                value={formData.nombres}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                name="apellidos"
                                placeholder="Ingrese sus apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                placeholder="Ingrese su correo"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Ingrese su contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="register-btn">Registrarse</button>
                    </form>
                    <button className="link-btn mt-3"
                            onClick={() => { navigate('/') }}>Regresar al Inicio de Sesion</button>
                </div>
            </div>
        </div>
    );
}
