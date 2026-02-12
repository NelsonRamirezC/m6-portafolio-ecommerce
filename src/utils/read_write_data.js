import { throws } from "assert";
import { write } from "fs";
import fs from "fs/promises";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const readData = async (nameFile) => {
    try {
        let pathFile = path.join(__dirname, "../data", nameFile);

        let data = await fs.readFile(pathFile, "utf8");

        return JSON.parse(data);

    } catch (error) {
        throw new Error("Error al intentar acceder a los productos.");
        
    }
};

export const writeData = async (nameFile, data) => {
    try {
        let pathFile = path.join(__dirname, "../data", nameFile);

        await fs.writeFile(pathFile, JSON.stringify(data, null, 4), 'utf8');

        return "todo ok!";

    } catch (error) {
        throw new Error("Error al intentar modificar los productos.");
        
    }
};




