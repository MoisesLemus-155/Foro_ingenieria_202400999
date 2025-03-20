import axios from 'axios';
import Swal from 'sweetalert2';
const URL = 'http://localhost:8080/api/login/';

export const apiLogin = async (registro_academico, password) => {
    try {
        const URL = 'http://localhost:8080/api/login/login'
        const response = await axios.post(`${URL}`, {
            registro_academico,
            password
        });
        const registroAcademico = response.data.registro_academico; // Asegúrate de que el campo esté presente
        if (registroAcademico) {
            localStorage.setItem("token", "some_token"); // Aquí podrías guardar un token si tu backend lo proporciona
            localStorage.setItem("registro_academico", registroAcademico); // Guardamos el registro académico
            console.log('Registro académico guardado en localStorage:', registroAcademico);
        } else {
            console.error('No se encontró registro_academico en la respuesta');
        }
        return true
    } catch ({ response: { data: { message } } }) {
        Swal.fire({
            icon: 'error',
            title: 'Error de Login',
            text: msg
        });
    }
}

export const apiRegister = async (registroAcademico, nombres, apellidos, correo, password) => {
    try {
        console.log("Antes de response: ");
        const response = await axios.post(`${URL}register`, 
            {
                registro_academico: registroAcademico,
                nombres: nombres,
                apellidos: apellidos,
                correo: correo,
                password: password
            });
        console.log("API: ", response.data);
        console.log("despues de response");
        return true;
    } catch (error) {
        console.error("Error en API:", error.response?.data || error.message);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data?.error || "Error desconocido",
            showConfirmButton: true,
            confirmButtonText: "OK",
        });
        return false;
    }
}