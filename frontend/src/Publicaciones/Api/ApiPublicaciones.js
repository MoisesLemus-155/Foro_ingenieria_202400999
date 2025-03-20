import axios from 'axios';
import Swal from 'sweetalert2';
const URL = 'http://localhost:8080/api/publis/';

export const listaPublicaciones = async () => {
    try {
        const publis = await axios.get(
            `${URL}publicaciones`
        );
        console.log(publis);
        return publis;
    } catch ({ response: { data } }) {
        return data.msg;
    }
};

export const crearPublicacion = async (cat_o_curso, mensaje) => {
    try {
        const publis = await axios.post(
            `${URL}crear`,
            {cat_o_curso, mensaje}
        );
        console.log(publis);
        return publis;
    } catch ({ response: { data } }) {
        return data.msg;
    }
}



export const comentar = async (mensaje, publicacion_id) => {
    try {
        const coment = await axios.post(
            `${URL}comentar/${publicacion_id}`,
            { mensaje }
        );
        console.log(coment);
        return coment;
    } catch ({ response: { data } }) {
        return data.msg;
    }
}