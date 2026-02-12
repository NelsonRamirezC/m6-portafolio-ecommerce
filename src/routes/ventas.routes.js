import { Router } from 'express';
import Venta from '../models/Venta.models.js';
import Producto from '../models/Producto.model.js';

const router = Router();



//GET ALL VENTAS
router.get('/', async (req, res) => {
    try {
        let ventas = await Venta.findAll();

        res.json({
            message: "Ok",
            ventas,
            cantidad: ventas.length
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});


//CREATE A NEW VENTA
router.post('/', async (req, res) => {
    try {

        let {productos} = req.body;

        let venta = new Venta(productos);

        await venta.save();
        
        
        res.status(201).json({
            message: `Venta generada con éxito con id: ${venta.id}`
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
});

export default router;