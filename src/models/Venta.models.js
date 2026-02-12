import { v4 as uuidv4 } from 'uuid';
import {readData, writeData} from '../utils/read_write_data.js';
import moment from 'moment';

import Producto from './Producto.model.js';

export default class Venta{
    constructor(productos = []){
        this.productos = productos;
        this.id =  uuidv4();
        this.fecha =  moment().format("DD-MM-YYYY");
        this.hora =  moment().format("h:mm:ss a");
        this.total = 0;
        this.cantidad = productos.length;
    }

    async save(){
        let ventas = await Venta.findAll();

        let productos = await Producto.findAll();

        this.productos = this.productos.map(producto => productos.find(p => p.id == producto));

        let total = 0;
        this.productos.forEach(producto => total+= producto.price);

        this.total = total;
        this.cantidad = this.productos.length;

        ventas.push(this);


        await writeData("ventas.json", ventas);

        return true;
    }


    //MÉTODOS ESTÁTICOS
    static async findAll(){
        let ventas = await readData("ventas.json");
        return ventas;
    }
}