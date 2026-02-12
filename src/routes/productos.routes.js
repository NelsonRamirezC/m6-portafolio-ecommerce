import { Router } from 'express';

import Producto from '../models/Producto.model.js';

const router = Router();


//GET ALL PRODUCTS
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


//GET PRODUCT BY ID
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


//CREATE A NEW PRODUCT
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


//UPDATE A PRODUCT USING ID

router.put('/:id', async (req, res) => {
    try {

        let id = req.params.id;
        let {title, price, description, category, image} = req.body;

        let producto = await Producto.findById(id);

        if(!producto){
            return res.status(404).json({message: `No existe un producto con id: ${id}.`});
        }

        producto.title = title;
        producto.price = price;
        producto.description = description;
        producto.category = category;
        producto.image = image;

        await producto.update();

        res.status(201).json({
            message: `Se actualizó correctamente el producto con id: ${producto.id}`
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});


//DELETE A PRODUCT BY ID

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let respuesta = await Producto.deleteById(id);

        if(!respuesta){
            return res.status(404).json({message: `No existe un producto con id: ${id}.`});
        }

        res.json({
            message: `se ha eliminado correctamente al producto con id: ${id}`
        });


    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});






export default router;