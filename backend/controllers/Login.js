const express = require('express')
const { dbConection } = require('../database/connector')

const login = async (req, res) => {
    try {
        const { registro_academico, password } = req.body;
        
        if (!registro_academico || !password) {
            return res.status(400).json({ error: 'Registro académico y contraseña son requeridos' });
        }
        
        const db = await dbConection();
        const [loged] = await db.query('SELECT * FROM usuario WHERE registro_academico = ? AND password = ?', [registro_academico, password]);
        
        if (loged.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            data: loged[0]
        });
        
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    login
}