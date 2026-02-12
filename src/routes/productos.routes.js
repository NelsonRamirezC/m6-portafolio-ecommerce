import { Router } from 'express';

import Producto from '../models/Producto.model.js';

const router = Router();



router.get('/', async (req, res) => {
    try {
        let productos = await Producto.findAll();
        res.json({
            message: "Ok",
            productos,
            cantidad: productos.length
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});


router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let producto = await Producto.findById(id);

        if(!producto){
            return res.status(404).json({message: `Productos con id: ${id}, no encontrado.`});
        }

        res.json({
            message: "Ok",
            producto
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});


router.post('/', async (req, res) => {
    try {

        let {title, price, description, category, image} = req.body;

        let nuevoProducto = new Producto(title, price, description, category, image);

        await nuevoProducto.save();
        
        res.status(201).json({
            message: `Producto creado correctamente con id: ${nuevoProducto.id}`
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});




export default router;