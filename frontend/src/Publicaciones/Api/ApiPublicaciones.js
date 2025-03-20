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