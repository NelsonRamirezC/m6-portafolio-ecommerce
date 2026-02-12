import { v4 as uuidv4 } from 'uuid';
import {readData, writeData} from '../utils/read_write_data.js'

export default class Producto {
    constructor(title, price, description, category, image, id = uuidv4()){
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.id=id;
    }


    //MÉTODOS DE INSTANCIA

    async save(){
        let productos = await Producto.findAll();

        let { id, title, price, description, category, image } = this;

        let producto = { id, title, price, description, category, image };

        productos.push(producto);

        console.log(productos);
        await writeData("productos.json", productos);

        return true;
    }

    async update(){
        let productos = await Producto.findAll();

        let productoFound = productos.find(producto => producto.id == this.id);

        if(!productoFound){
            return false;
        }

        productoFound.title = this.title;
        productoFound.price = this.price;
        productoFound.description = this.description;
        productoFound.category = this.category;
        productoFound.image = this.image;

        await writeData("productos.json", productos);
        return true;

    }

    //MÉTODOS ESTÁTICOS
    static async findAll(){
        let productos = await readData("productos.json");
        return productos;
    }

    static async findById(id){
        let productos = await Producto.findAll();

        let productoFound = productos.find(producto => producto.id == id);

        if(productoFound){
            let { id, title, price, description, category, image } = productoFound;

            return new Producto(title, price, description, category, image, id);
        }
        

        return productoFound;
    }

    static async deleteById(id){
        let productos = await Producto.findAll();
        
        let index = productos.findIndex(producto => producto.id == id);

        if(index == -1){
            return false;
        }else {

            productos.splice(index, 1);
            await writeData("productos.json", productos);
            return true;
        }
    }

}