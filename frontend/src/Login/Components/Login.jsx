import { useState } from "react";
import Swal from "sweetalert2";
import "../Login.css";
import { apiLogin } from "../Api/ApiLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    const [registroAcademico, setRegistroAcademico] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(registroAcademico, password);
        console.log("Antes del apilogin en Loginjsx");
        const result = await apiLogin(registroAcademico, password);
        console.log("paso del apilogin en Loginjsx");
        if (result) {
            Swal.fire({
                icon: "success",
                title: "PERFECTO!",
                text: "Ha iniciado sesión con exito!",
                confirmButtonText: '<span class= "btn-swal">OK</span>',
            }).then((r) => {
                if (r.isConfirmed) {
                    window.location.href = "/Inicio";
                } else {
                    window.location.href = "/";
                }
            });
        }
    };

    return (
        <div className="body-login">
            <div className="container">
                <div className="login-box">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Registro Academico</label>
                            <input
                                type="registroAcademico"
                                placeholder="Ingresa tu Carnet"
                                value={registroAcademico}
                                onChange={(e) => setRegistroAcademico(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">Iniciar Sesión</button>
                    </form>
                    <div className="options">
                        <button className="link-btn"
                            onClick={() => { navigate('/LostPass') }}>Olvidé mi contraseña</button>
                        <button className="link-btn"
                            onClick={() => { navigate('/Register') }}>Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
