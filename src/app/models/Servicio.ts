

import { Marca } from './Marca';


export class Servicio {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;

    constructor(
        nombre: string,
        precio: number,
        tipo: string,
        id: number
    ) {
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.id = id;
    }
}