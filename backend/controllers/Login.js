const express = require('express')
const { dbConection } = require('../database/connector')
const session = require('express-session')

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
        console.log("continua el proceso");
        
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            data: loged[0]
        });
        
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const lostPassword = async (req, res) => {
    try {
        const { registro_academico, correo } = req.body;
        
        if (!registro_academico || !correo) {
            return res.status(400).json({ error: 'Registro académico o correo es requerido' });
        }
        
        const db = await dbConection();
        const [user] = await db.query('SELECT * FROM usuario WHERE registro_academico = ? AND correo = ?', [registro_academico, correo]);
        
        if (user.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        req.session.registro_academico = registro_academico;

        res.status(200).json({
            message: 'Usuario encontrado',
            data: user[0]
        });
        
    } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const newPassword = async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({ error: 'Nueva contraseña es requerida' });
        }
        
        const registro = req.session.registro_academico;
        if (!registro) {
            return res.status(400).json({ error: 'Registro académico no encontrado' });
        }
        const db = await dbConection();
        const [result] = await db.query('UPDATE usuario SET password = ? WHERE registro_academico = ?', [password, registro]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No se pudo actualizar la contraseña' });
        }

        // Eliminar el registro de la sesión después de actualizar
        req.session.registro_academico = null;

        return res.status(200).json({
            message: 'Contraseña actualizada'
        });
        
    } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


module.exports = {
    login,
    lostPassword,
    newPassword
}