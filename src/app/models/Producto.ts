import { Marca } from "./Marca";

export interface Producto {
    id: number;
    art: string;
    nombre: string;
    precio: number;
    esTela: boolean;
    marca: Marca ;
  }
  