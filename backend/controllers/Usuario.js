const express = require('express')
const { dbConection } = require('../database/connector')

const getUsers = async(req, res) => {
    try {
        const db = await dbConection();
        const [usuarios] = await db.query('SELECT * FROM usuario');
        res.status(200).json({
            message: 'Usuarios obtenidos correctamente',
            data: usuarios
        });

        console.log('Usuarios obtenidos correctamente:' + usuarios);
        
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


module.exports = {
    getUsers
}