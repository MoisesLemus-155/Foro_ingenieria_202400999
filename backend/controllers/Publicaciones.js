const express  = require('express');
const { dbConection } = require('../database/connector');


const getPublicaciones = async (req, res) => {
    try {
        const db = await dbConection();
        const [publicaciones] = await db.query('SELECT * FROM publicacion');
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('Error en la obtención de publicaciones:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const getMisPublicaciones = async (req, res) => {
    const registro_academico = req.session.registro_academico;
    try {
        const db = await dbConection();
        const [publicaciones] = await db.query('SELECT * FROM publicacion WHERE usuario_id = ?', [registro_academico]);
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('Error en la obtención de mis publicaciones:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const createPublicacion = async (req, res) => {
    const registro_academico = req.session.registro_academico;
    const {cat_o_curso, mensaje } = req.body;
    try {
        const db = await dbConection();
        await db.query('INSERT INTO publicacion (usuario_id, cat_o_curso, mensaje) VALUES (?, ?, ?)', [registro_academico, cat_o_curso, mensaje]);
        res.status(201).json({ message: 'Publicación creada' });
    } catch (error) {
        console.error('Error en la creación de publicación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const deleteMiPublicacion = async (req, res) => {
    const registro_academico = req.session.registro_academico;
    const { id } = req.params;
    try {
        const db = await dbConection();
        await db.query('DELETE FROM publicacion WHERE usuario_id = ? AND id = ?', [registro_academico, id]);
        res.status(200).json({ message: 'Publicación eliminada' });
    } catch (error) {
        console.error('Error en la eliminación de publicación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


// -------------------------------------------------------- COMENTARIOS --------------------------------------------------------

const getComentarios = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await dbConection();
        const [comentarios] = await db.query('SELECT * FROM comentario WHERE id_publicacion = ?', [id]);
        res.status(200).json({
            message: 'Comentarios obtenidos',
            comentarios
        });
    } catch (error) {
        console.error('Error en la obtención de comentarios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const createComentario = async (req, res) => {
    const registro_academico = req.session.registro_academico;
    const {id} = req.params;
    const {mensaje } = req.body;
    try {
        const db = await dbConection();
        await db.query('INSERT INTO comentario (mensaje, usuario_id, id_publicacion) VALUES (?, ?, ?)', [mensaje, registro_academico, id]);
        res.status(201).json({ message: 'Comentario creado' });
    } catch (error) {
        console.error('Error en la creación de comentario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    getPublicaciones,
    getMisPublicaciones,
    createPublicacion,
    deleteMiPublicacion,
    getComentarios,
    createComentario
}