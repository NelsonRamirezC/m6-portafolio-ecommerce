import { Router } from 'express';

const router = Router();



router.get('/', (req, res) => {
    res.send('ruta ventas');
});


export default router;