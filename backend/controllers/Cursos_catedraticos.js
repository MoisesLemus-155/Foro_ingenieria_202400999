const express = require('express');
const { dbConection } = require('../database/connector');

const getCursos = async (req, res) => {
    try {
        const db = await dbConection();
        const [cursos] = await db.query('SELECT * FROM curso');
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Error en la obtención de cursos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {  
    getCursos
}
