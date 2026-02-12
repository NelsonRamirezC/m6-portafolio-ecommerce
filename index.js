import express from 'express';

import productoRoutes from './src/routes/productos.routes.js';
import ventasRoutes from './src/routes/ventas.routes.js';

const app = express();

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});

//MIDDLEWARES GENERALES
app.use(express.json());
app.use(express.urlencoded({extended:true})),

//RUTAS DE FRONT


//RUTAS DE LA API

app.use("/api/v1/productos", productoRoutes);
app.use("/api/v1/ventas", ventasRoutes);





