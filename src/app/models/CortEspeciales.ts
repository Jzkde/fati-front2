

import { Sistema } from './Sistema';
import { Marca } from './Marca';


export class CortEspeciales {
  id?: number;
  tela: string;
  precio: number;
  esTela: boolean;
  sistema: Sistema;

  constructor(
    tela: string,
    precio: number,
    esTela: boolean,
    sistema: Sistema,
    marca?: Marca,
    id?: number
  ) {
    this.tela = tela;
    this.precio = precio;
    this.esTela = esTela;
    this.sistema = sistema;
    this.id = id;
  }
}